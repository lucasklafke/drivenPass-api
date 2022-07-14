import express, { Request, Response } from "express"
import dotenv from "dotenv"
import errorHandler from "./middlewares/errorHandler.js" 
const app = express()
dotenv.config()
const port = process.env.PORT || 5000
app.use(errorHandler)
app.get("/", (req: Request,res:Response) => {
        res.send("você conseguiu guerreiro")
})
app.listen(port)