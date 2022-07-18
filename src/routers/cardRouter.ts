import {Router} from "express"
import { createCard, getOneCard, getManyCards, deleteCard } from "../controllers/cardController.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import { validateJWT } from "../middlewares/validateJWT.js";
import { cardSchema } from "../schemas/cardSchemas.js";

const cardRouter = Router();

cardRouter.post("/create/card",schemaValidator(cardSchema),validateJWT,createCard)
cardRouter.get("/find/card/:cardId",validateJWT,getOneCard)
cardRouter.get("/find/cards",validateJWT,getManyCards)
cardRouter.delete("/delete/card/:id",validateJWT,deleteCard)
export default cardRouter;