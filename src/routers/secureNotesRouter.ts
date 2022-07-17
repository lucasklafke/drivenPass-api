import { Router } from "express";
import { createSecureNote } from "../controllers/secureNotesController.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import { validateJWT } from "../middlewares/validateJWT.js";
import  {createSecureNoteSchema}  from "../schemas/secureNoteSchemas.js";
const secureNotesRouter = Router();

secureNotesRouter.post("/create/secure-note",schemaValidator(createSecureNoteSchema),validateJWT,createSecureNote)



export default secureNotesRouter;