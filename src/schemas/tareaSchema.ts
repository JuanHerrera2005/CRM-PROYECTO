import Joi from "joi";
 
export const tareaCrearSchema = Joi.object({
  clienteId: Joi.number().integer().required().messages({
    'any.required': 'El id del cliente es obligatorio.',
    'number.base': 'El id del cliente debe ser un número entero.',
    'number.integer': 'El id del cliente debe ser un número entero.'
  }),
  titulo: Joi.string().max(100).required().messages({
    'any.required': 'El título es obligatorio.',
    'string.base': 'El título debe ser un texto.',
    'string.empty': 'El título es obligatorio.',
    'string.max': 'El título no puede exceder 100 caracteres.'
  }),
  fechaVencimiento: Joi.date().iso().required().messages({
    'any.required': 'La fecha de vencimiento es obligatoria.',
    'date.base': 'La fecha de vencimiento debe ser válida.',
    'date.format': 'La fecha debe estar en formato ISO (YYYY-MM-DD).'
  }),
  estado: Joi.string().max(30).required().messages({
    'any.required': 'El estado es obligatorio.',
    'string.base': 'El estado debe ser un texto.',
    'string.empty': 'El estado es obligatorio.',
    'string.max': 'El estado no puede exceder 30 caracteres.'
  })
});