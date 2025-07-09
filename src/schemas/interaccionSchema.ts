import Joi from "joi";
 
export const interaccionCrearSchema = Joi.object({
  clienteId: Joi.number().integer().required().messages({
    'any.required': 'El id del cliente es obligatorio.',
    'number.base': 'El id del cliente debe ser un número entero.',
    'number.integer': 'El id del cliente debe ser un número entero.'
  }),
  fecha: Joi.date().iso().required().messages({
    'any.required': 'La fecha es obligatoria.',
    'date.base': 'La fecha debe tener un formato válido.',
    'date.format': 'La fecha debe estar en formato ISO (YYYY-MM-DD).'
  }),
  tipo: Joi.string().max(30).required().messages({
    'any.required': 'El tipo de interacción es obligatorio.',
    'string.base': 'El tipo debe ser un texto.',
    'string.empty': 'El tipo es obligatorio.',
    'string.max': 'El tipo no puede exceder 30 caracteres.'
  }),
  descripcion: Joi.string().max(255).optional().allow(null, '').messages({
    'string.base': 'La descripción debe ser un texto.',
    'string.max': 'La descripción no puede exceder 255 caracteres.'
  })
});