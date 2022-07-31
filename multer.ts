import express,  {Request, Response, Router} from "express"
import multer, { FileFilterCallback, Multer } from 'multer'

const router : Router = express.Router() 


type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

export const fileStorage = multer.diskStorage({
    destination: (
        request: Request,
        file: Express.Multer.File,
        callback: DestinationCallback
    ): void => {
        callback(null, "images")
    },

    filename: (
        req: Request, 
        file: Express.Multer.File, 
        callback: FileNameCallback
    ): void => {
        callback(null, req.body.name) //if testing with postman, change req.body.name to any string value eg picture.png
    }
})

export const fileFilter = (
    request: Request,
    file: Express.Multer.File,
    callback: FileFilterCallback
): void => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        callback(null, true)
    } else {
        callback(null, false)
    }
}


const upload : Multer = multer({storage: fileStorage})
router.post("/upload", upload.single("file"), (req : Request, res: Response) => {
    res.status(200).json({message: "File Uploaded!"})
})

module.exports = router