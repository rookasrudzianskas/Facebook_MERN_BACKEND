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
// this makes connection between db and the fb app backend
const mongoURI = 'mongodb+srv://admin:B4QBeSPm1p8aTz2P@cluster0.qsist.mongodb.net/backend-facebook?retryWrites=true&w=majority';
// some boring stuff goes in here

// creating the connection
const conn = mongoose.createConnection(mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let gfs;

conn.once('open', () => {
    // once the first connection is done, I want to console log, that db is connected
    console.log("DB is connected");
    // grid fs, grid file system, it creates the files system for larger files which are larger than 16MB
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('images');
})

const storage = new GridFsStorage({
    // the url
    url: mongoURI,
    // this is images schema, the name, and the info
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const filename = `image-${Date.now()}${path.extname(file.originalname)}`;

            const fileInfo = {
                filename: filename,
                bucketName: 'images',
            };

            resolve(fileInfo);
        });
    }
});

const upload = multer({ storage });

// this is general connection for saving the code
mongoose.connect(mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


// api routes
app.get('/', (req, res) =>  res.status(200).send("Backend is working on 🎊 🚀"));

// normal api route, to upload the imagees // post

app.post('/api/upload/image', upload.single('file'), (req, res) => {
    res.status(201).send(req.file);
})
// listen

app.listen(port, () => console.log(`Listening on the port which is ${port}`));