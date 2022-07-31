import express, {Router} from "express"
import { createCategory, getAllCategory } from "../controllers/category"



const router : Router = express.Router()

router.post("/", createCategory)

router.get("/", getAllCategory)



module.exports = router;