import express, {Application} from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

const app: Application = express()


dotenv.config()












const port = process.env.PORT || 3001

mongoose.connect(String(process.env.MONGO_URL))
    .then(() =>
        app.listen(port, () => {
            console.log(`App Listening at port ${port}....`)
        }))
    .catch(err => console.log(`Failed to connect to MongoDB: ${err.message}`))
