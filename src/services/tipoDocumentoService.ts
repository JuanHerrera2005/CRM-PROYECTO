// services/tipoDocumento.service.ts
import { PrismaClient, tipo_documentos } from "@prisma/client";
import { TipoDocumento } from '../models/tipoDocumento';
import { RESPONSE_DELETE_OK, RESPONSE_INSERT_OK, RESPONSE_UPDATE_OK } from "../shared/constants";
import { fromPrismaTipoDocumento } from "../mappers/tipoDocumento.mapper";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

export const listarTiposDocumento = async() => {
    console.log('tipoDocumentoService::listarTipoDocumentos');

    const tipoDocumentos: tipo_documentos[]  = await prisma.tipo_documentos.findMany({
        where: {
            estado_auditoria: '1' 
        },
        orderBy: {
            id: 'asc' // <- Cambiado a 'id' para coincidir con tu schema.prisma
        }
    });

    return tipoDocumentos.map((tipoDocumento: tipo_documentos) => fromPrismaTipoDocumento(tipoDocumento));
}

export const obtenerTipoDocumento = async(id: number) => {
    console.log('tipoDocumentoService::obtenerTipoDocumento');
    
    const tipoDocumento: tipo_documentos | null = await prisma.tipo_documentos.findUnique({
        where: {
            id: id // <- Cambiado a 'id'
        }
    });

    return tipoDocumento;
}

export const insertarTipoDocumento = async(tipoDocumento: TipoDocumento) => {
    console.log('tipoDocumentoService::insertarTipoDocumento');
 
    const nuevoTipoDocumento: tipo_documentos = await prisma.tipo_documentos.create({
        data: tipoDocumento // Se envía completo (incluyendo fechas si vienen del front)
    });
 
    return RESPONSE_INSERT_OK;
}

export const modificarTipoDocumento = async (id: number, tipoDocumento: TipoDocumento) => {
    console.log('tipoDocumentoService::modificarTipoDocumento');

    try {
        const tipoDocumentoModificado: tipo_documentos = await prisma.tipo_documentos.update({
            where: {
                id: id,
            },
            data: {
                ...tipoDocumento,
                fecha_actualizacion: new Date(),
            },
        });

        return RESPONSE_UPDATE_OK;
    } catch (error: any) {
        if (
            error instanceof PrismaClientKnownRequestError &&
            error.code === 'P2025'
        ) {
            throw new Error('Tipo de documento no encontrado');
        }

        throw error;
    }
};


export const eliminarTipoDocumento = async (id: number) => {
    console.log('tipoDocumentoService::eliminarTipoDocumento');

    try {
        await prisma.tipo_documentos.update({
            where: {
                id,
            },
            data: {
                estado_auditoria: '0',
                fecha_actualizacion: new Date(),
            },
        });

        return RESPONSE_DELETE_OK;
    } catch (error: any) {
        if (
            error instanceof PrismaClientKnownRequestError &&
            error.code === 'P2025'
        ) {
            throw new Error(`El tipo de documento con ID ${id} no existe.`);
        }
        throw error;
    }
};
