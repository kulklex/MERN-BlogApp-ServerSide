import { Request, Response } from "express"
import { Category } from "../models/Category"



export const createCategory = async (req: Request, res: Response) => {
    const newCategory = new Category(req.body)
    try{
        const savedCategory = await newCategory.save()
        res.status(201).json({category: savedCategory, message: "Successfully Created!"})
    } catch(error){
        res.status(500).json({message: "Failed to create category", error})
    }
}

export const getAllCategory = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find()
        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json({error})
    }   
}