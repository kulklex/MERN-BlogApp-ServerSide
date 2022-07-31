import express, {Application, Router} from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import bodyParser from "body-parser"

const app: Application = express()


dotenv.config()

app.use(bodyParser.json({
    limit: "30mb"
}))

app.use(bodyParser.urlencoded({
    limit: "30mb",
    extended: true
}))

//routers
const authRouter : Router = require("./routes/auth")
const userRouter : Router = require("./routes/user")
const postRouter : Router = require("./routes/post")

app.use("", authRouter)
app.use("/users", userRouter)
app.use("/posts", postRouter)






const port = process.env.PORT || 3001

mongoose.connect(String(process.env.MONGO_URL))
    .then(() =>
        app.listen(port, () => {
            console.log(`App Listening at port ${port}....`)
        }))
    .catch(err => console.log(`Failed to connect to MongoDB: ${err.message}`))
