import joi from "joi"

export const createSecureNoteSchema = joi.object({
        title: joi.string().max(50).required(),
        secureNote: joi.string().max(1000).required(),
})