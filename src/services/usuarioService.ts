
import { PrismaClient, usuarios } from '@prisma/client';
import { Usuario } from '../models/usuario';
import { fromPrismaUsuario, toPrismaUsuario } from '../mappers/usuario.mapper';
import { RESPONSE_DELETE_OK, RESPONSE_INSERT_OK, RESPONSE_UPDATE_OK } from '../shared/constants';

const prisma = new PrismaClient();

export const listarUsuarios = async () => {
  console.log('usuarioService::listarUsuarios');
  const usuarios = await prisma.usuarios.findMany({
    where: {
      estado_auditoria: '1'
    },
    orderBy: {
      id: 'asc'
    }
  });
  return usuarios.map((usuario: usuarios) => fromPrismaUsuario(usuario));
};

export const obtenerUsuario = async (id: number) => {
  console.log('usuarioService::obtenerUsuario');
  const usuario: usuarios | null = await prisma.usuarios.findUnique({
    where: { id,
            estado_auditoria: "1"
        }
  });
  return usuario ? fromPrismaUsuario(usuario) : null;
};

export const insertarUsuario = async (usuario: Usuario) => {
  console.log('usuarioService::insertarUsuario');
  await prisma.usuarios.create({
    data: toPrismaUsuario(usuario)
  });
  return RESPONSE_INSERT_OK;
};

export const modificarUsuario = async (id: number, usuario: Usuario) => {
  console.log('usuarioService::modificarUsuario');
  const dataActualizada: Usuario = {
    ...usuario,
    fechaActualizacion: new Date()
  };
  await prisma.usuarios.update({
    where: {
      id: id
    },
    data: toPrismaUsuario(dataActualizada)
  });
  return RESPONSE_UPDATE_OK;
};


export const eliminarUsuario = async (id: number) => {
    console.log('usuarioService::eliminarUsuario');
     await prisma.usuarios.update({
        where: { id },
        data: {
            estado_auditoria: '0',
            fecha_actualizacion: new Date()
        }
    });
    return RESPONSE_DELETE_OK;
};