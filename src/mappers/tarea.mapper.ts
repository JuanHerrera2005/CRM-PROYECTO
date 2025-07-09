import { tareas } from '@prisma/client';
import { Tarea } from '../models/tarea';
 
export const fromPrismaTarea = (tarea: tareas): any => {
  return {
 
    id: tarea.id,
    clienteId: tarea.cliente_id,
    titulo: tarea.titulo,
    fechaVencimiento: tarea.fecha_vencimiento
      ? tarea.fecha_vencimiento.toISOString().split('T')[0]
      : undefined,
    estado: tarea.estado,
    estadoAuditoria: tarea.estado_auditoria,
    fechaCreacionAuditoria: tarea.fecha_creacion_auditoria,
    fechaActualizacion: tarea.fecha_actualizacion,
  };
}
 
export const toPrismaTarea = (tarea: Tarea) => {
  let fecha: Date | null = null;

  if (tarea.fechaVencimiento) {
    fecha = new Date(tarea.fechaVencimiento);
    fecha.setUTCHours(0, 0, 0, 0); // Forzamos a medianoche UTC
  }  
  return {
        cliente_id: tarea.clienteId,
        titulo: tarea.titulo,
        fecha_vencimiento: fecha,
        estado: tarea.estado,
        estado_auditoria: tarea.estadoAuditoria,
        fecha_actualizacion: tarea.fechaActualizacion,
    };
 
}