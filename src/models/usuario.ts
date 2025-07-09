export interface Usuario {
  idUsuario: number;
  nombre: string;
  apellidos: string;
  tipoDocumentoId: number;
  numeroDocumento: string;
  email: string;
  password: string;
  estadoAuditoria: string;
  fechaCreacionAuditoria: Date;
  fechaActualizacion: Date;
}