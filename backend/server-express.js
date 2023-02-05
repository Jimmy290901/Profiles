const express = require('express');
const mongoose = require('mongoose');
const profileModel = require('./models/profiles_model');
const dotenv = require('dotenv');
const multer = require('multer');
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Logging the rejected field from multer error
app.use((error, req, res, next) => {
    console.log('This is the rejected field ->', error.field);
  });

const port = 3000;


app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});

//Accessing env variables
dotenv.config();

const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;
const uri = `mongodb+srv://${db_username}:${db_password}@cluster0.8bvzjxi.mongodb.net/?retryWrites=true&w=majority`;

//Connecting to mongodb atlast cluster
mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology:true})
    .then(() => {
        console.log("Connected to MongoDB successfully");
    })
    .catch((err) => {
        console.error(err);
    });

//upload img to local folder
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
let upload = multer({storage: storage});

app.get('/check-username', async (req, res) => {
    const username = req.query.username;
    const exception = req.query.exception;
    const profile = await profileModel.findOne({username: {$eq: username, $ne: exception}});
    console.log(profile);
    try {
        if (profile) {
            res.send({'username_exists': true});
        } else {
            res.send(null);
        }
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
});

app.post('/login', (req, res) => {

});

app.post('/signup', upload.single('profile_img'), (req, res) => {
    console.log(req.body);
    res.send("Request received"); //error due to this
    //https://www.geeksforgeeks.org/upload-and-retrieve-image-on-mongodb-using-mongoose/
});

app.get('/profile/:username', (req, res) => {

});

app.patch('/profile/:username/edit', (req, res) => {

});