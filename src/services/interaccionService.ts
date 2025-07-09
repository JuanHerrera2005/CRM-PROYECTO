
import { PrismaClient, interacciones } from '@prisma/client';
import { Interaccion } from '../models/interaccion';
import { fromPrismaInteraccion, toPrismaInteraccion } from '../mappers/interaccion.mapper';
import { RESPONSE_DELETE_OK, RESPONSE_INSERT_OK, RESPONSE_UPDATE_OK } from '../shared/constants';

const prisma = new PrismaClient();

export const listarInteracciones = async () => {
  console.log('interaccionService::listarInteracciones');

  const interacciones = await prisma.interacciones.findMany({
    where: { estado_auditoria: '1' },
    orderBy: { id: 'asc' }
  });

  return interacciones.map((i: interacciones) => fromPrismaInteraccion(i));
};

export const obtenerInteraccion = async (id: number) => {
  console.log('interaccionService::obtenerInteraccion');

  const interaccion = await prisma.interacciones.findUnique({
    where: { id,
            estado_auditoria: "1"
        }
  });

  return interaccion ? fromPrismaInteraccion(interaccion) : null;
};

export const insertarInteraccion = async (interaccion: Omit<Interaccion, 'id'>) => {
  console.log('interaccionService::insertarInteraccion');

  const data = toPrismaInteraccion({
    ...interaccion,
    fechacreacionAuditoria: new Date(),
    fechaActualizacion: new Date()
  } as Interaccion);

  await prisma.interacciones.create({ data });
  return RESPONSE_INSERT_OK;
};

export const modificarInteraccion = async (id: number, interaccion: Partial<Interaccion>) => {
  console.log('interaccionService::modificarInteraccion');

  const dataActualizada = {
    ...interaccion,
    fechaActualizacion: new Date()
  } as Interaccion;

  await prisma.interacciones.update({
    where: { id },
    data: toPrismaInteraccion(dataActualizada)
  });

  return RESPONSE_UPDATE_OK;
};

export const eliminarInteraccion = async(id: number) => {
    console.log('interaccionService::eliminarInteraccion');
     await prisma.interacciones.update({
        where: { id },
        data: {
            estado_auditoria: '0',
           
        }
    });
    return RESPONSE_DELETE_OK;
};