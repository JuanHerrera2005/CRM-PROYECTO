import { clientes } from '@prisma/client';
import { Cliente } from '../models/cliente';
 
export const fromPrismaCliente = (cliente: clientes): any => {
  return {
    id: cliente.id,
    nombre: cliente.nombre,
    ruc: cliente.ruc,
    email: cliente.email,
    telefono: cliente.telefono,
    // convierte fecha a string "YYYY-MM-DD" si existe
    fechaCreacionEmpresa: cliente.fecha_creacion_empresa
      ? cliente.fecha_creacion_empresa.toISOString().split('T')[0]
      : undefined,
    estadoAuditoria: cliente.estado_auditoria,
    fechaCreacionAuditoria: cliente.fecha_creacion_auditoria,
    fechaActualizacion: cliente.fecha_actualizacion,
  };
};
 
export const toPrismaCliente = (cliente: Cliente) => {
  let fecha: Date | null = null;

  if (cliente.fechaCreacionEmpresa) {
    fecha = new Date(cliente.fechaCreacionEmpresa);
    fecha.setUTCHours(0, 0, 0, 0); // Forzamos a medianoche UTC
  }

  return {
    nombre: cliente.nombre,
    ruc: cliente.ruc,
    email: cliente.email,
    telefono: cliente.telefono,
    fecha_creacion_empresa: fecha,
    estado_auditoria: cliente.estadoAuditoria,
    fecha_creacion_auditoria: cliente.fechaCreacionAuditoria,
    fecha_actualizacion: cliente.fechaActualizacion,
  };
};