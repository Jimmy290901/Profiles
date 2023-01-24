import mongoose from "mongoose";
import dotenv from "dotenv";
import {ProfileModel} from "./models/profile_model.js"

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("../proto/profiles.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const profiles = grpcObject.profiles;

//Accessing env variables
dotenv.config();

const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;
const uri = `mongodb+srv://${db_username}:${db_password}@cluster0.unv2znf.mongodb.net/?retryWrites=true&w=majority`;

//Connecting to mongodb atlast cluster
mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology:true, serverApi: ServerApiVersion.v1})
    .then(() => {
        console.log("Connected to MongoDB successfully");
    })
    .catch((err) => {
        console.error(err);
    });

//Setting up the server
const server = new grpc.Server();

server.addService(profiles.ProfileService.service, {
    Login: Login,
    Signup: Signup,
    UpdateProfile: UpdateProfile
});

server.bindAsync('0.0.0.0:9000', grpc.ServerCredentials.createInsecure(), (err, port)=> {
    if (err) {
        console.log("Error:", err);
    } else {
        server.start();
        console.log("Server running successfully at port:", port);
    }
});

function Login(call, callback) {

}

function Signup(call, callback) {

}

function UpdateProfile(call, callback) {

}