export interface Contacto {
  id: number;
  clienteId: number;             // Relación con Cliente
  nombre: string;                 // @db.VarChar(50)
  apellidos: string;              // @db.VarChar(50)
  tipoDocumentoId: number;      // Relación con TipoDocumento
  numDocumento: string;          // @unique @db.VarChar(20)
  cargo: string;                  // @db.VarChar(50)
  email: string;                  // @db.VarChar(100)
  telefono?: string;              // Optional (@db.VarChar(15))
  estadoAuditoria: string;       // @default("1")
  fechaCreacionAuditoria: Date;
  fechaActualizacion: Date;
}