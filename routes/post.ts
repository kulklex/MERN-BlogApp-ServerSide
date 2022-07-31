import express, {Router} from "express"
import { createPost, getPost, getAllPosts, updatePost, deletePost } from "../controllers/post"


const router : Router = express.Router()

//create post
router.post("/", createPost )


//fetch a particular post
router.get("/:id", getPost)


//fetch all posts by a user or all posts in a particular category, or all posts in every category
router.get("/", getAllPosts)


//update a particular post
router.put("/:id", updatePost)


//delete a particular post
router.delete("/:id", deletePost)

module.exports = router;

