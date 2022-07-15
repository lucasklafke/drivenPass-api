import { Router } from "express"
import { createCredential, getCredential, getCredentials } from "../controllers/credentialController.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import { validateJWT } from "../middlewares/validateJWT.js";
import credentialSchema from "../schemas/credentialSchemas.js";

const credentialRouter = Router();

credentialRouter.post("/create/credential", schemaValidator(credentialSchema),validateJWT,createCredential)
credentialRouter.get("/get/credential/:id", validateJWT, getCredential)
credentialRouter.get("/get/credentials", validateJWT, getCredentials)
export default credentialRouter