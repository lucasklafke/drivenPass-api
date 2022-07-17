import { Router } from "express";
import { createSecureNote, getOneNote, getManyNotes, deleteNote } from "../controllers/secureNotesController.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import { validateJWT } from "../middlewares/validateJWT.js";
import  {createSecureNoteSchema}  from "../schemas/secureNoteSchemas.js";
const secureNotesRouter = Router();

secureNotesRouter.post("/create/secure-note",schemaValidator(createSecureNoteSchema),validateJWT,createSecureNote)
secureNotesRouter.get("/find/secure-note/:noteId",validateJWT,getOneNote)
secureNotesRouter.get("/find/secure-notes",validateJWT,getManyNotes)
secureNotesRouter.delete("/delete/secure-note/:id",validateJWT,deleteNote)


export default secureNotesRouter;