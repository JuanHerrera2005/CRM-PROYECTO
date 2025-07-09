import Joi from "joi";
 
 
export const clienteCrearSchema = Joi.object({
  nombre: Joi.string().max(50).required().messages({
    'any.required': 'El nombre es obligatorio.',
    'string.base': 'El nombre debe ser un texto.',
    'string.empty': 'El nombre es obligatorio.',
    'string.max': 'El nombre no puede exceder 50 caracteres.'
  }),
  ruc: Joi.string().pattern(/^\d{11}$/).required().messages({
    'any.required': 'El RUC es obligatorio.',
    'string.pattern.base': 'El RUC debe tener exactamente 11 dígitos numéricos.',
    'string.empty': 'El RUC es obligatorio.'
  }),
  email: Joi.string().email().max(100).required().messages({
    'any.required': 'El correo electrónico es obligatorio.',
    'string.email': 'El correo electrónico no es válido.',
    'string.empty': 'El correo electrónico es obligatorio.',
    'string.max': 'El correo electrónico no puede exceder 100 caracteres.'
  }),
  telefono: Joi.string().max(15).required().messages({
    'any.required': 'El teléfono es obligatorio.',
    'string.base': 'El teléfono debe ser un texto.',
    'string.empty': 'El teléfono es obligatorio.',
    'string.max': 'El teléfono no puede exceder 15 caracteres.'
  }),
  fechaCreacionEmpresa: Joi.date().iso().optional().messages({
    'date.base': 'La fecha de creación de empresa no es válida.',
    'date.format': 'La fecha debe estar en formato ISO (YYYY-MM-DD).'
  })
});