import { interacciones } from '@prisma/client';
import { Interaccion } from '../models/interaccion';

export const fromPrismaInteraccion = (interaccion: interacciones): any => {
  return {
    id: interaccion.id,
    clienteId: interaccion.cliente_id,
    fecha: interaccion.fecha 
      ? interaccion.fecha.toISOString().split('T')[0]
      : undefined,
    tipo: interaccion.tipo,
    descripcion: interaccion.descripcion ?? undefined,
    estadoAuditoria: interaccion.estado_auditoria,
    fechacreacionAuditoria: interaccion.fecha_creacion_auditoria,
    fechaActualizacion: interaccion.fecha_actualizacion
  };
};

export const toPrismaInteraccion = (interaccion: Interaccion) => {
  let fecha: Date | null = null;

  if (interaccion.fecha) {
    fecha = new Date(interaccion.fecha);
    fecha.setUTCHours(0, 0, 0, 0); // Forzamos a medianoche UTC

  }
  return {
    cliente_id: interaccion.clienteId,
    fecha: fecha,
    tipo: interaccion.tipo,
    descripcion: interaccion.descripcion ?? null,
    estado_auditoria: interaccion.estadoAuditoria,
    fecha_creacion_auditoria: interaccion.fechacreacionAuditoria,
    fecha_actualizacion: interaccion.fechaActualizacion
  };
};
