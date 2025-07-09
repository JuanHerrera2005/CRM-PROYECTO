import { tipo_documentos } from '@prisma/client';
import { TipoDocumento } from '../models/tipoDocumento';


export const fromPrismaTipoDocumento = (tipoDocumento: tipo_documentos): any => {
    // id_tipo_documento: number;
    // nombre: string;
    // estado_auditoria: string | null;
    // fecha_creacion: Date | null;
    // fecha_actualizacion: Date | null;
    
    return {
        idTipoDocumento: tipoDocumento.id,
        nombre: tipoDocumento.nombre,
        estadoAuditoria: tipoDocumento.estado_auditoria,
        fechaCreacion: tipoDocumento.fecha_creacion_auditoria ? new Date(tipoDocumento.fecha_creacion_auditoria) : null,
        fechaActualizacion: tipoDocumento.fecha_actualizacion ? new Date(tipoDocumento.fecha_actualizacion) : null
    };
}

export const toPrismaTipoDocumento = (tipoDocumento: TipoDocumento) => {
    return {
        
        nombre: tipoDocumento.nombre,
       
};
}