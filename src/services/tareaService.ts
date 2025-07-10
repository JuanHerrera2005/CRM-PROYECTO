import { PrismaClient,tareas} from "@prisma/client";
import { Tarea } from '../models/tarea'; // Asegúrate de que la interfaz coincida
import { RESPONSE_DELETE_OK, RESPONSE_INSERT_OK, RESPONSE_UPDATE_OK } from "../shared/constants";
import { fromPrismaTarea, toPrismaTarea } from "../mappers/tarea.mapper";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
 
const prisma = new PrismaClient();
 
export const listarTareas = async () => {
    console.log('tareaService::listarTareas');
    const tareas = await prisma.tareas.findMany({
        where: { estado_auditoria: '1' },
        orderBy: { id: 'asc' }
    });
    return tareas.map((tarea: tareas) => fromPrismaTarea(tarea));
};
 
export const obtenerTarea = async (id: number) => {
    console.log('tareaService::obtenerTarea');
    const tarea: tareas | null = await prisma.tareas.findUnique({
        where: { id,
            estado_auditoria: "1"
        }
    });
 
    return tarea ? fromPrismaTarea(tarea) : null;
};
 
export const insertarTarea = async (tarea: Tarea) => {
    console.log('tareaService::insertarTarea');
   
     await prisma.tareas.create({
        data: toPrismaTarea(tarea)
    });
    return RESPONSE_INSERT_OK;
};
 
export const modificarTarea = async (id: number, tarea: Tarea) => {
    console.log('tareaService::modificarTarea');

    const dataActualizada: Tarea = { ...tarea, fechaActualizacion: new Date() };

    try {
        await prisma.tareas.update({
            where: { id },
            data: toPrismaTarea(dataActualizada),
        });

        return RESPONSE_UPDATE_OK;
    } catch (error: any) {
        if (
            error instanceof PrismaClientKnownRequestError &&
            error.code === 'P2025'
        ) {
            throw new Error('Tarea no encontrada');
        }

        throw error;
    }
};
export const eliminarTarea = async (id: number) => {
    console.log('tareaService::eliminarTarea');

    const tarea = await prisma.tareas.findFirst({
        where: {
            id,
            estado_auditoria: '1',
        },
    });

    if (!tarea) {
        throw new Error(`La tarea con ID ${id} no existe o ya está eliminada.`);
    }

    await prisma.tareas.update({
        where: { id },
        data: {
            estado_auditoria: '0',
            fecha_actualizacion: new Date(),
        },
    });

    return RESPONSE_DELETE_OK;
};
