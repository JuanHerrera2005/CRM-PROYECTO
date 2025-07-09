import Joi from "joi";

export const oportunidadCrearSchema = Joi.object({
  clienteId: Joi.number().integer().required().messages({
    'any.required': 'El id del cliente es obligatorio.',
    'number.base': 'El id del cliente debe ser un número entero.',
    'number.integer': 'El id del cliente debe ser un número entero.'
  }),
  usuarioId: Joi.number().integer().required().messages({
    'any.required': 'El id del usuario es obligatorio.',
    'number.base': 'El id del usuario debe ser un número entero.',
    'number.integer': 'El id del usuario debe ser un número entero.'
  }),
  titulo: Joi.string().max(100).required().messages({
    'any.required': 'El título es obligatorio.',
    'string.base': 'El título debe ser un texto.',
    'string.empty': 'El título es obligatorio.',
    'string.max': 'El título no puede exceder 100 caracteres.'
  }),
  descripcion: Joi.string().max(255).optional().allow(null, '').messages({
    'string.base': 'La descripción debe ser un texto.',
    'string.max': 'La descripción no puede exceder 255 caracteres.'
  }),
  montoEstimado: Joi.number().precision(2).required().messages({
    'any.required': 'El monto estimado es obligatorio.',
    'number.base': 'El monto estimado debe ser un número.'
  }),
  fechaCierreEstimada: Joi.date().iso().optional().messages({
    'date.base': 'La fecha de cierre estimada no es válida.',
    'date.format': 'La fecha debe estar en formato ISO (YYYY-MM-DD).'
  }),
  estado: Joi.string().max(30).required().messages({
  'any.required': 'El estado es obligatorio.',
  'string.base': 'El estado debe ser un texto.',
  'string.empty': 'El estado es obligatorio.',
  'string.max': 'El estado no puede exceder 30 caracteres.'
  })
});  