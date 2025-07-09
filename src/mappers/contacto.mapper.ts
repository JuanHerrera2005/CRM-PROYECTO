import { Contacto } from '../models/contacto';
import { contactos } from '@prisma/client';
 
export const fromPrismaContacto = (contacto: contactos) => {
  return {
    id: contacto.id,
    clienteId: contacto.cliente_id,
    nombre: contacto.nombre,
    apellidos: contacto.apellidos,
    tipoDocumentoId: contacto.tipo_documento_id,
    numDocumento: contacto.num_documento,
    cargo: contacto.cargo,
    email: contacto.email,
    telefono: contacto.telefono,
    estadoAuditoria: contacto.estado_auditoria,
    fechaCreacionAuditoria: new Date(contacto.fecha_creacion_auditoria),
    fechaActualizacion: new Date(contacto.fecha_actualizacion),
  };
}
 
export const toPrismaContacto = (contacto: Contacto) => {
  return {
    cliente_id: contacto.clienteId,
    nombre: contacto.nombre,
    apellidos: contacto.apellidos,
    tipo_documento_id: contacto.tipoDocumentoId,
    num_documento: contacto.numDocumento,
    cargo: contacto.cargo,
    email: contacto.email,
    telefono: contacto.telefono,
    estado_auditoria: contacto.estadoAuditoria,
    fecha_actualizacion: contacto.fechaActualizacion ? contacto.fechaActualizacion.toISOString() : new Date().toISOString(),
  };
}