import express, {Application, Router, Request, Response} from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cors from "cors"
import path from "path"

const app: Application = express()

dotenv.config()

app.use(bodyParser.json({
    limit: "30mb"
}))

app.use(bodyParser.urlencoded({
    limit: "30mb",
    extended: true
}))

app.use("/images", express.static(path.join(__dirname ,"/images")))


app.get("/", (req: Request, res: Response) => {
    res.status(200).send("APP IS RUNNING")
})


const multerRouter = require("./multer")
app.use("", multerRouter)

app.use(cors())

//routers
const authRouter : Router = require("./routes/auth")
const userRouter : Router = require("./routes/user")
const postRouter : Router = require("./routes/post")
const categoryRouter: Router = require("./routes/category")

app.use("", authRouter)
app.use("/users", userRouter)
app.use("/posts", postRouter)
app.use("/categories", categoryRouter)


const port = process.env.PORT || 3001

mongoose.connect(String(process.env.MONGO_URL))
    .then(() =>
        app.listen(port, () => {
            console.log(`App Listening at port ${port}....`)
        }))
    .catch(err => console.log(`Failed to connect to MongoDB: ${err.message}`))
