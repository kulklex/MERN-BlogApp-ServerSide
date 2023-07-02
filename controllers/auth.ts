import { Request, Response } from "express"
import User from "../models/user"

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { email, password, confirmPassword, firstName, lastName, username } = req.body
        try {
            const existingUser = await User.findOne({ email })
            if (existingUser) return res.status(400).json({ message: "User Already Exists" })

            if (password !== confirmPassword) return res.status(400).json({ message: "Passwords do not match" })

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = await User.create({ name: `${firstName} ${lastName}`, email, username, password: hashedPassword })
            const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })

            res.status(200).json({ user, token, message: "User Successfully Created" })
        } catch (error) {
            res.status(500).json({ message: "Couldn't process the SignUp....", error })
        }
    } catch (error) {
            res.status(400).json({message: `Fill Up All Input Fields               ${error}`})
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body
        try {
            const existingUser = await User.findOne({email})
            if(!existingUser) return res.status(404).json({message: "Invalid Email or Password"})

            const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
            if(!isPasswordCorrect) return res.status(404).json({message: "Invalid Email or Password"})

            const token = jwt.sign({email: existingUser.email, id: existingUser._id}, process.env.JWT_SECRET_KEY, {expiresIn: '1h'} )
            res.status(200).json({user: existingUser, token, message: `Welcome ${existingUser.name}`})
        } catch (error) {
            res.status(500).json({message: "Login Failed! Try Again"})
        }
    } catch (error) {
        res.status(400).json({message: "Fill Up All Input Fields      ", error})
    }
}






