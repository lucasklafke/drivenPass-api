import {Router} from "express"
import authRouter from "./authRouter.js"
import credentialRouter from "./credentialRouter.js"

const globalRouter = Router()

globalRouter.use(authRouter)
globalRouter.use(credentialRouter)


export default globalRouter;