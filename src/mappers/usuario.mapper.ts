import { usuarios } from '@prisma/client';
import { Usuario } from '../models/usuario';

export const fromPrismaUsuario = (usuario: usuarios): any => {
    return {
        idUsuario: usuario.id,
        nombre: usuario.nombre,
        apellidos: usuario.apellidos,
        tipoDocumentoId: usuario.tipo_documento_id,
        numeroDocumento: usuario.num_documento,
        email: usuario.email,
        password: usuario.password,
        estadoAuditoria: usuario.estado_auditoria,
        fechaCreacionAuditoria: usuario.fecha_creacion_auditoria ,
        fechaActualizacion: usuario.fecha_actualizacion ,
    };
};

export const toPrismaUsuario = (usuario: Usuario) => {
    return {
        nombre: usuario.nombre,
        apellidos: usuario.apellidos,
        tipo_documento_id: usuario.tipoDocumentoId,
        num_documento: usuario.numeroDocumento,
        email: usuario.email,
        password: usuario.password,
        estado_auditoria: usuario.estadoAuditoria,
        fecha_creacion_auditoria: usuario.fechaCreacionAuditoria,
        fecha_actualizacion: usuario.fechaActualizacion,
    };
};
