import { oportunidades } from '@prisma/client';
import { Oportunidad } from '../models/oportunidad';

export const fromPrismaOportunidad = (oportunidad: oportunidades): any => {
  return {
    id: oportunidad.id,
    clienteId: oportunidad.cliente_id,
    usuarioId: oportunidad.usuario_id,
    titulo: oportunidad.titulo,
    descripcion: oportunidad.descripcion ?? undefined,
    montoEstimado: oportunidad.monto_estimado ?? undefined,
    estado: oportunidad.estado,
    fechaCierreEstimada: oportunidad.fecha_cierre_estimada
      ? oportunidad.fecha_cierre_estimada.toISOString().split('T')[0]
      : undefined,
    estadoAuditoria: oportunidad.estado_auditoria,
    fechaCreacionAuditoria: oportunidad.fecha_creacion_auditoria,
    fechaActualizacion: oportunidad.fecha_actualizacion
  };
};

export const toPrismaOportunidad = (oportunidad: Oportunidad) => {
  let fecha: Date | null = null;

  if (oportunidad.fechaCierreEstimada) {
    fecha = new Date(oportunidad.fechaCierreEstimada);
    fecha.setUTCHours(0, 0, 0, 0); // Forzamos a medianoche UTC
  }

  return {
    cliente_id: oportunidad.clienteId,
    usuario_id: oportunidad.usuarioId,
    titulo: oportunidad.titulo,
    descripcion: oportunidad.descripcion,
    monto_estimado: oportunidad.montoEstimado,
    estado: oportunidad.estado,
    fecha_cierre_estimada: fecha,
    estado_auditoria: oportunidad.estadoAuditoria,
    fecha_creacion_auditoria: oportunidad.fechaCreacionAuditoria,
    fecha_actualizacion: oportunidad.fechaActualizacion
  };
};

