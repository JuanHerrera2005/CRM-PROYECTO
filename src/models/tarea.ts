export interface Tarea {
  id: number;
  clienteId: number;
  titulo: string;
  fechaVencimiento?: Date;
  estado: string;
  estadoAuditoria: string;
  fechaCreacionAuditoria: Date;
  fechaActualizacion: Date;
}