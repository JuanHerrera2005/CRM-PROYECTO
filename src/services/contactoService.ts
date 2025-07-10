import { contactos, PrismaClient } from "@prisma/client";
import { Contacto } from '../models/contacto';
import { RESPONSE_DELETE_OK, RESPONSE_INSERT_OK, RESPONSE_UPDATE_OK } from "../shared/constants";
import { fromPrismaContacto, toPrismaContacto } from "../mappers/contacto.mapper";
 
const prisma = new PrismaClient();
 
export const listarContactos = async() => {
    console.log('contactoService::listarContactos');
    const contactos = await prisma.contactos.findMany({
        where: { estado_auditoria: '1' },
        orderBy: { id: 'asc' }
    });
    return contactos.map((contacto: contactos) => fromPrismaContacto(contacto));
}
 
 
export const obtenerContacto = async(id: number) => {
    console.log('contactoService::obtenerContacto');
    const contacto:contactos | null = await prisma.contactos.findUnique({
        where: { id,
            estado_auditoria: "1"
        }
    });
    return contacto ? fromPrismaContacto(contacto) : null;
       
}
 
export const insertarContacto = async(contacto: Contacto) => {
    console.log('contactoService::insertarContacto');
 
    await prisma.contactos.create({
        data: toPrismaContacto(contacto)
       
    });
    return RESPONSE_INSERT_OK;
}
 
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const modificarContacto = async (id: number, contacto: Contacto) => {
    console.log('contactoService::modificarContacto');

    const dataActualizada: Contacto = {
        ...contacto,
        fechaActualizacion: new Date(),
    };

    try {
        await prisma.contactos.update({
            where: { id },
            data: toPrismaContacto(dataActualizada),
        });

        return RESPONSE_UPDATE_OK;
    } catch (error: any) {
        if (
            error instanceof PrismaClientKnownRequestError &&
            error.code === 'P2025'
        ) {
            throw new Error('Contacto no encontrado');
        }

        throw error;
    }
};

 
export const eliminarContacto = async (id: number) => {
    console.log('contactoService::eliminarContacto');

    // Busca contacto activo con ese id
    const contacto = await prisma.contactos.findFirst({
        where: {
            id,
            estado_auditoria: '1',
        },
    });

    if (!contacto) {
        throw new Error(`El contacto con ID ${id} no existe o ya está eliminado.`);
    }

    await prisma.contactos.update({
        where: { id },
        data: {
            estado_auditoria: '0',
        },
    });

    return RESPONSE_DELETE_OK;
};
