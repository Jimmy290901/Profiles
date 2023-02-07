const express = require('express');
const mongoose = require('mongoose');
const profiles = require('./models/profiles_model');
const dotenv = require('dotenv');
const multer = require('multer');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const jwt = require('jsonwebtoken');

//Middlewares
const {validateToken, adminTokenValidate} = require('./middlewares/validate-token');

const app = express();

//Configuring middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Setting up server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});

//Accessing env variables
dotenv.config();
const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const uri = `mongodb+srv://${db_username}:${db_password}@cluster0.8bvzjxi.mongodb.net/?retryWrites=true&w=majority`;

//Connecting to mongodb atlast cluster
mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology:true})
    .then(() => {
        console.log("Connected to MongoDB successfully");
    })
    .catch((err) => {
        console.error(err);
    });

//Configuring storage for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
const upload = multer({storage: storage});

//helper methods
const generateJWTtoken = (username) => {
    return jwt.sign({
        date: new Date(),
        username: username
    }, JWT_SECRET_KEY);
}

//Setting up express routes and corresponding callbacks
app.get('/check-username', async (req, res) => {
    const username = req.query.username;
    const exception = req.query.exception;
    try {
        const profile = await profiles.findOne({username: {$eq: username, $ne: exception}});
        if (profile) {
            res.send({'username_exists': true});
        } else {
            res.send(null);
        }
    } catch(err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.post('/login', async (req, res) => {
    const [username, password] = Buffer.from(req.body.credentials.split(' ')[1], 'base64').toString('ascii').split(' ');
    try {
        const data = await profiles.findOne({username: username, password: password});
        if (data) {
            const jwt_token = generateJWTtoken(username);
            res.send({
                success: true,
                token: jwt_token
            });
        } else {
            res.send({
                success: false
            });
        }
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
});

app.post('/signup', upload.single('profile_img'), async (req, res) => {
    try {
        const profile = {
            ...req.body,
            dob: new Date(req.body.dob) ,
            profile_img: {
                data: fs.readFileSync('uploads/images/' + req.file.filename),
                contentType: 'image/png'
            }
        }
        await profiles.create(profile);
        const jwt_token = generateJWTtoken(req.body.username);
        res.send({
            profile: profile,
            token: jwt_token
        }); 
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
});

app.get('/profile/:username', validateToken, async (req, res) => {
    const req_username = req.params["username"];
    try {
        const user_profile = await profiles.findOne({username: req_username});
        if (!user_profile) {
            res.status(404).send({
                message: 'User Profile not found'
            })
        } else {
            res.send(user_profile);         
        }
    } catch(err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.patch('/profile/:username/edit', validateToken, upload.single('profile_img'), async (req, res) => {
    const req_username = req.params['username'];
    try {
        let user_profile = await profiles.findOne({username: req_username});
        user_profile = {
            ...req.body,
            profile_img: user_profile.profile_img
        }
        if (req.file !== undefined) {
            user_profile.profile_img = {
                data: fs.readFileSync('uploads/images/' + req.file.filename),
                contentType: 'image/png'
            }
        }
        await profiles.updateOne({username: req_username}, user_profile);
        if (req_username !== req.body.username) {
            new_jwt_token = generateJWTtoken(req.body.username);
        }
        res.send({success: true, message: "Update successful", new_jwt_token: new_jwt_token});
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

app.get('/profiles/all', adminTokenValidate, async (req, res) => {
    try {
        const allProfiles = await profiles.find({username: {$ne: 'admin'}}, 'username name heightInCm gender dob profile_img');
        res.send(allProfiles);
    } catch(err) {
        console.error(err);
        res.status(500).send(err);
    }
})