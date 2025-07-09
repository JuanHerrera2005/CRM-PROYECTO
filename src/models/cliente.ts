export interface Cliente {
  id: number;                      // @id @default(autoincrement())
  nombre: string;                  // @db.VarChar(50)
  ruc: string;                    // @unique @db.VarChar(11)
  email: string;                  // @db.VarChar(100)
  telefono: string;               // @db.VarChar(15)
  fechaCreacionEmpresa?: Date;  // Optional (DateTime?)
  estadoAuditoria?: string;       // @default("1") @db.Char(1)
  fechaCreacionAuditoria: Date; // @default(now())
  fechaActualizacion: Date;      // @default(now())
}