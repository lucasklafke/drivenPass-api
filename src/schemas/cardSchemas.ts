import joi from "joi"

export const cardSchema = joi.object({
        title: joi.string().required(),
        number: joi.string().required(),
        name: joi.string().required(),
        cvv: joi.string().required(),
        password: joi.string().required(),
        type: joi.string().allow("credit", "debit","credit/debit").required(),
        expireDate: joi.string().required()

})
