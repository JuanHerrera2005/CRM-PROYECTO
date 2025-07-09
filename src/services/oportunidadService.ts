
import { PrismaClient, oportunidades } from '@prisma/client';
import { Oportunidad } from '../models/oportunidad';
import { fromPrismaOportunidad, toPrismaOportunidad } from '../mappers/oportunidad.mapper';
import { RESPONSE_DELETE_OK, RESPONSE_INSERT_OK, RESPONSE_UPDATE_OK } from '../shared/constants';

const prisma = new PrismaClient();

export const listarOportunidades = async () => {
  console.log('oportunidadService::listarOportunidades');

  const oportunidades = await prisma.oportunidades.findMany({
    where: { estado_auditoria: '1' },
    orderBy: { id: 'asc' }
  });

  return oportunidades.map((oportunidad: oportunidades) => fromPrismaOportunidad(oportunidad));
};

export const obtenerOportunidad = async (id: number) => {
  console.log('oportunidadService::obtenerOportunidad');

  const oportunidad = await prisma.oportunidades.findUnique({
    where: { id,
            estado_auditoria: "1"
        }
  });

  return oportunidad ? fromPrismaOportunidad(oportunidad) : null;
};

export const insertarOportunidad = async (oportunidad: Omit<Oportunidad, 'id'>) => {
  console.log('oportunidadService::insertarOportunidad');

  const data = toPrismaOportunidad({
    ...oportunidad,
    fechaCreacionAuditoria: new Date(),
    fechaActualizacion: new Date()
  } as Oportunidad);

  await prisma.oportunidades.create({ data });
  return RESPONSE_INSERT_OK;
};

export const modificarOportunidad = async (id: number, oportunidad: Partial<Oportunidad>) => {
  console.log('oportunidadService::modificarOportunidad');

  const dataActualizada = {
    ...oportunidad,
    fechaActualizacion: new Date()
  } as Oportunidad;

  await prisma.oportunidades.update({
    where: { id },
    data: toPrismaOportunidad(dataActualizada)
  });

  return RESPONSE_UPDATE_OK;
};


export const eliminarOportunidad = async(id: number) => {
    console.log('oportunidadService::eliminarOportunidad');
     await prisma.oportunidades.update({
        where: { id },
        data: {
            estado_auditoria: '0',
            
        }
    });
    return RESPONSE_DELETE_OK;
};