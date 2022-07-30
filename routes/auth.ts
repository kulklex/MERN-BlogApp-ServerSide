import express, {Router} from "express"
import { loginUser, registerUser } from "../controllers/auth"


const router : Router = express.Router()

//Sign Up
router.post("/register", registerUser )


//Sign In
router.post("/login", loginUser)

module.exports = router;

