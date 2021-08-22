//importing
import express from "express";
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from "pusher";
import cors from "cors";

//app config
const app = express();

const port = process.env.Port || 9000

const pusher = new Pusher({
    appId: "1247919",
    key: "4e52e57cedd7629d1bd4",
    secret: "5a8c23168f55c554f5a2",
    cluster: "eu",
    useTLS: true
});

//middleware
app.use(express.json())
app.use(cors())

//DB config
mongoose.set('useUnifiedTopology', true)
const c_url = "mongodb+srv://admin:Ml1GEua3ZFFnDKbI@cluster0.lvdsw.mongodb.net/whatsappDb?retryWrites=true&w=majority"
mongoose.connect(c_url,{
    useCreateIndex: true,
    useNewUrlParser: true,
    
});

//?

const db = mongoose.connection

db.once('open', () => {
    console.log("Db connected");

    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on("change", (change) => {
        console.log(change);

        if (change.operationType === 'insert'){
            const messageDetails = change.fullDocument;
            pusher.trigger('message', 'inserted',
            {
                name : messageDetails.name,
                message : messageDetails.message,
                timestamp : messageDetails.timestamp,
                received: messageDetails.received,
            });
        }else{
            console.log("Error")
        }
    });
});

//api routes
app.get("/",(req,res)=>res.status(200).send('hello'))

app.get('/messages/sync', (req,res) => {
    Messages.find((err, data) => {
        if(err){
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }  
    })
})
//api route which we will be using to post msgs into mongodb
app.post('/messages/new', (req,res) => {
    const dbMessage = req.body;
    Messages.create(dbMessage, (err, data) => {
        if(err){
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }  
    })
})



//listen
app.listen(port,()=>console.log(`Listening on port:${port}`))