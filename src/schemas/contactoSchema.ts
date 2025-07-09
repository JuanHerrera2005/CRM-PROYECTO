import Joi from "joi";
 
export const contactoCrearSchema = Joi.object({
  clienteId: Joi.number().integer().required().messages({
    'any.required': 'El id del cliente es obligatorio.',
    'number.base': 'El id del cliente debe ser un número entero.',
    'number.integer': 'El id del cliente debe ser un número entero.'
  }),
  nombre: Joi.string().max(50).required().messages({
    'any.required': 'El nombre es obligatorio.',
    'string.base': 'El nombre debe ser un texto.',
    'string.empty': 'El nombre es obligatorio.',
    'string.max': 'El nombre no puede exceder 50 caracteres.'
  }),
  apellidos: Joi.string().max(50).required().messages({
    'any.required': 'Los apellidos son obligatorios.',
    'string.base': 'Los apellidos deben ser un texto.',
    'string.empty': 'Los apellidos son obligatorios.',
    'string.max': 'Los apellidos no pueden exceder 50 caracteres.'
  }),
  tipoDocumentoId: Joi.number().integer().required().messages({
    'any.required': 'El id del tipo de documento es obligatorio.',
    'number.base': 'El id del tipo de documento debe ser un número entero.',
    'number.integer': 'El id del tipo de documento debe ser un número entero.'
  }),
  numDocumento: Joi.string().max(20).required().messages({
    'any.required': 'El número de documento es obligatorio.',
    'string.base': 'El número de documento debe ser un texto.',
    'string.empty': 'El número de documento es obligatorio.',
    'string.max': 'El número de documento no puede exceder 20 caracteres.'
  }),
  cargo: Joi.string().max(50).optional().allow(null, '').messages({
    'string.base': 'El cargo debe ser un texto.',
    'string.max': 'El cargo no puede exceder 50 caracteres.'
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
  })
});