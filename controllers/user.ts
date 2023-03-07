import { Request, Response } from "express"
import { Post } from "../models/Post"
import { User } from "../models/User"

const bcrypt = require('bcrypt')


//update user
export const updateUser = async (req: Request, res: Response) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 12)
        }

        try {
            const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true})
            res.status(200).json({user, message: "User Updated Successfully!" })
        } catch (error) {
            res.status(500).json({ message: "User Update Failed                  ", error })
        }
    } else {
        res.status(401).json({ message: "You are not authorized to update" })
    }
}

//delete user
export const deleteUser = async (req: Request, res: Response) => { 
    if(req.body.userId === req.params.id){
        try {
            const user = await User.findById(req.params.id)
            try {
                await Post.deleteMany({email: user?.email})
                await User.findByIdAndDelete(req.params.id)
                res.status(200).json({message: "User deleted successfully"})
            } catch (error) {
                res.status(500).json({message: "Failed to delete user"})
            }
        } catch (error) {
            res.status(404).json({message: "User does not exist"})
        }
    } else {
        res.status(401).json({message: "You are not authorized to delete"})
    }
}


//get User
export const getUser = async(req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: "Fetching Users failed", error})
    }
}


//get all User
export const getUsers = async(req: Request, res: Response) => {
    try {
        const user = await User.find()
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: "Fetching Users failed", error})
    }
}
