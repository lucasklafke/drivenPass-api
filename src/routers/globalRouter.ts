import {Router} from "express"
import authRouter from "./authRouter.js"
import credentialRouter from "./credentialRouter.js"
import secureNotesRouter from "./secureNotesRouter.js"
const globalRouter = Router()

globalRouter.use(authRouter)
globalRouter.use(credentialRouter)
globalRouter.use(secureNotesRouter)

export default globalRouter;