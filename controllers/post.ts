import { Request, Response } from "express"
import { Post } from "../models/Post"


//create post 
export const createPost = async (req: Request, res: Response) => {
    const post = req.body
    const newPost = new Post(post)
    try {
        const savedPost = await newPost.save()
        res.status(201).json({ post: savedPost, message: "Successfully Created!" })
    } catch (error) {
        res.status(500).json({ message: "Creating Post Failed                  ", error })
    }
}

//fetch a post 
export const getPost = async (req: Request, res: Response) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json({ post })
    } catch (error) {
        res.status(500).json({ message: "Fetching Post Failed!", error })
    }
}

//update post 
export const updatePost = async (req: Request, res: Response) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post?.email === req.body.email) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
                res.status(200).json({ post: updatedPost, message: "Successfully Updated!" })
            } catch (error) {
                res.status(500).json(error)
            }
        } else {
            res.status(401).json({ message: `Unauthorized action` })
        }
    } catch (error) {
        res.status(404).json({ message: "User does not exist", error })
    }
}

//delete post 
export const deletePost = async (req: Request, res: Response) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post?.email === req.body.email) {
            try {
                await Post.findByIdAndDelete(req.params.id)
                res.status(200).json({ message: "Successfully Deleted!" })
            } catch (error) {
                res.status(500).json(error)
            }
        } else {
            res.status(401).json({ message: `Unauthorized action` })
        }
    } catch (error) {
        res.status(404).json({ message: "User does not exist", error })
    }
}

//fetch all posts 
export const getAllPosts = async (req: Request, res: Response) => {
    const email = req.query.user
    const category = req.query.cat
    try {
        let posts;
        if (email) {
            posts = await Post.find({ email: email })
        } else if (category) {
            posts = await Post.find({
                categories: {$in: [category]}
            })
        } else {
            posts = await Post.find()
        }

        res.status(200).json({posts})
    } catch (error) {
        res.status(404).json({ message: "User does not exist", error })
    }
}

