import {Router} from "express"
import { createWifi, deleteWifi, getManyWifis, getOneWifi } from "../controllers/wifiController.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import { validateJWT } from "../middlewares/validateJWT.js";
import { wifiSchema } from "../schemas/wifiSchemas.js";

const wifiRouter = Router();

wifiRouter.post("/create/wifi",schemaValidator(wifiSchema),validateJWT,createWifi)
wifiRouter.get("/find/wifi/:wifiId",validateJWT,getOneWifi)
wifiRouter.get("/find/wifis",validateJWT,getManyWifis)
wifiRouter.delete("/delete/wifi/:id",validateJWT,deleteWifi)
export default wifiRouter;