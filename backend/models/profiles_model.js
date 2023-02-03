const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "Username is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    heightInCm: {
        type: Number,
        required: [true, "Height is required"]
    },
    gender: {
        type: String,
        enum: ["MALE", "FEMALE"],
        required: [true, "Gender is required"]
    },
    dob: {
        type: Date,
        required: [true, "D.O.B is requied"]
    },
    profile_img: {
        data: Buffer,
        contentType: String
    }
});

const ProfileModel = new mongoose.model('Profile', profileSchema);

module.exports = ProfileModel;