import express, {Router} from "express"
import { registerUser } from "../controllers/auth"


const router : Router = express.Router()

//Sign Up
router.post("/register", registerUser )


module.exports = router;

