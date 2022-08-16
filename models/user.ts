import mongoose from "mongoose";



const UserSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        unique: true //making sure none can create a user with an existing username
    },
    email : {
        type: String,
        required: true,
        unique: true 
    },
    username : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: ""
    },
    isAdmin: {
        type: Boolean,
        default: true
    }
}, {timestamps: true})

export const User = mongoose.model('User', UserSchema)

