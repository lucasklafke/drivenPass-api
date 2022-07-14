import express, { Request, Response , json} from "express"
import "express-async-errors";
import dotenv from "dotenv"
import errorHandler from "./middlewares/errorHandler.js" 
import globalRouter from "./routers/globalRouter.js"
const app = express()
dotenv.config()
const port = process.env.PORT || 5000


app.use(json())
app.use(globalRouter)
app.use(errorHandler)

app.listen(port)