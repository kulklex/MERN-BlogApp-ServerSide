import express, {Router} from "express"
import { updateUser, deleteUser, getUser, getUsers } from '../controllers/user';


const router : Router = express.Router()

//get user
router.get("/:id", getUser)

//Update User
router.put("/:id", updateUser)

//Delete User
router.delete("/:id", deleteUser)

//get all users
router.get("/", getUsers)

module.exports = router;