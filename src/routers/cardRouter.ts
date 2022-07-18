import {Router} from "express"
import { createCard } from "../controllers/cardController.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import { validateJWT } from "../middlewares/validateJWT.js";
import { cardSchema } from "../schemas/cardSchemas.js";

const cardRouter = Router();

cardRouter.post("/create/card",schemaValidator(cardSchema),validateJWT,createCard)

export default cardRouter;