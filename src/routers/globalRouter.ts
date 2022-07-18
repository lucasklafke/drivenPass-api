import {Router} from "express"
import authRouter from "./authRouter.js"
import cardRouter from "./cardRouter.js"
import credentialRouter from "./credentialRouter.js"
import secureNotesRouter from "./secureNotesRouter.js"
const globalRouter = Router()

globalRouter.use(authRouter)
globalRouter.use(credentialRouter)
globalRouter.use(secureNotesRouter)
globalRouter.use(cardRouter)

export default globalRouter;