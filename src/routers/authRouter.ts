import {Router} from "express"
import {signUp, signIn} from "../controllers/authController.js"
import { schemaValidator } from "../middlewares/schemaValidator.js"
import { validateJWT } from "../middlewares/validateJWT.js"
import authSchema from "../schemas/authSchema.js"
const authRouter = Router()

authRouter.post("/signup",schemaValidator(authSchema),signUp)
authRouter.post("/signin",schemaValidator(authSchema),validateJWT,signIn)
export default authRouter