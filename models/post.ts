import mongoose from "mongoose";



const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
}, {timestamps: true})

const Post = mongoose.model('Post', PostSchema)

export default Post

