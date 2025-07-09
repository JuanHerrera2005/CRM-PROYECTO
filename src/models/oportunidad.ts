export interface Oportunidad {
  id: number;
  clienteId: number;
  usuarioId: number;
  titulo: string;
  descripcion?: string;
  montoEstimado?: number;
  estado: string;
  fechaCierreEstimada?: Date;
  estadoAuditoria: string;
  fechaCreacionAuditoria: Date;
  fechaActualizacion: Date;
}