export interface Interaccion{
  id: number;
  clienteId: number;
  fecha?: Date;
  tipo: string;
  descripcion?: string;
  estadoAuditoria: string;
  fechacreacionAuditoria: Date;
  fechaActualizacion: Date;
}