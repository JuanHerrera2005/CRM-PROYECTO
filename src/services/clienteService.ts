import { PrismaClient, clientes } from '@prisma/client';
import { Cliente } from '../models/cliente';
import { RESPONSE_DELETE_OK, RESPONSE_INSERT_OK, RESPONSE_UPDATE_OK } from "../shared/constants";
import { fromPrismaCliente, toPrismaCliente } from "../mappers/cliente.mapper";
 
const prisma = new PrismaClient();
 
export const listarClientes = async() => {
    console.log('clienteService::listarClientes');
    const clientes = await prisma.clientes.findMany({
        where: { estado_auditoria: '1' },
        orderBy: { id: 'asc' }
    });
    return clientes.map((cliente : clientes) => fromPrismaCliente(cliente));
}
 
export const obtenerCliente = async(id: number) => {
    console.log('clienteService::obtenerCliente');
    const clientes: clientes | null = await prisma.clientes.findUnique({
        where: { id,
            estado_auditoria: "1"
        }
    });
    return clientes ? fromPrismaCliente(clientes) : null;
 
}
 
export const insertarCliente = async(cliente: Cliente) => {
    console.log('clienteService::insertarCliente');
 
    await prisma.clientes.create({
    data:  toPrismaCliente(cliente)
  });
  return RESPONSE_INSERT_OK;
}
 
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const modificarCliente = async (id: number, cliente: Cliente) => {
    console.log('clienteService::modificarCliente');
    const dataActualizada = {
        ...cliente,
        id,
        fechaActualizacion: new Date(),
    };

    try {
        await prisma.clientes.update({
            where: { id },
            data: toPrismaCliente(dataActualizada),
        });

        return RESPONSE_UPDATE_OK;
    } catch (error: any) {
        if (
            error instanceof PrismaClientKnownRequestError &&
            error.code === 'P2025'
        ) {
            throw new Error('Cliente no encontrado');
        }

        throw error;
    }
};
 
export const eliminarCliente = async (id: number) => {
    console.log('clienteService::eliminarCliente');

    // Buscar cliente activo con ese id
    const cliente = await prisma.clientes.findFirst({
        where: {
            id,
            estado_auditoria: '1',
        },
    });

    if (!cliente) {
        throw new Error(`El cliente con ID ${id} no existe o ya está eliminado.`);
    }

    await prisma.clientes.update({
        where: { id },
        data: {
            estado_auditoria: '0',
        },
    });

    return RESPONSE_DELETE_OK;
};
