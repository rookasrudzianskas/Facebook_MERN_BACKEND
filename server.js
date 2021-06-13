import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import GridFsStorage from "multer-gridfs-storage";
import Grid from "gridfs-stream";
import bodyParser from "body-parser";
import path from "path";
import Pusher from "pusher";

Grid.mongo = mongoose.mongo;



//app ocnfig

const app = express();
const port = process.env.PORT || 9000;


// middlewares

app.use(bodyParser.json());
app.use(cors());
// db config

const mongoURI = 'mongodb+srv://admin:B4QBeSPm1p8aTz2P@cluster0.qsist.mongodb.net/backend-facebook?retryWrites=true&w=majority';

const conn = mongoose.createConnection(mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connect(mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


// api routes
// api routes
app.get('/', (req, res) =>  res.status(200).send("Hello world 🚀"));

// listen

app.listen(port, () => console.log("Listening on something"));