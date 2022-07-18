import {Router} from "express"
import authRouter from "./authRouter.js"
import cardRouter from "./cardRouter.js"
import credentialRouter from "./credentialRouter.js"
import secureNotesRouter from "./secureNotesRouter.js"
import wifiRouter from "./wifiRouter.js"
const globalRouter = Router()

globalRouter.use(authRouter)
globalRouter.use(credentialRouter)
globalRouter.use(secureNotesRouter)
globalRouter.use(cardRouter)
globalRouter.use(wifiRouter)
export default globalRouter;