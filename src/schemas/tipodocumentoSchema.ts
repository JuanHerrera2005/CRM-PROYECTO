import Joi from "joi";

export const tipodocumentoCrearSchema = Joi.object({
  nombre: Joi.string().max(50).required().messages({
    'any.required': 'El nombre es obligatorio.',
    'string.base': 'El nombre debe ser un texto.',
    'string.empty': 'El nombre es obligatorio.',
    'string.max': 'El nombre no puede exceder 50 caracteres.'
  })
});