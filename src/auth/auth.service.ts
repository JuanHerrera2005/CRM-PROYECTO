import { PrismaClient } from '@prisma/client';
import { UsuarioJWT } from '../models/usuariojwt';
import { signToken } from '../auth/jwt';
import { hashPassword, comparePasswords } from '../auth/passwordUtils';
import {
  RESPONSE_UPDATE_OK,
  RESPONSE_DELETE_OK,
  RESPONSE_CREDENTIALS_ERROR
} from '../shared/constants';

const prisma = new PrismaClient();

export const listarUsuarios = async () => {
  return await prisma.usuariojwt.findMany({
    where: { estado_auditoria: '1' },
    orderBy: { id: 'asc' }
  });
};

export const buscarUsuarioPorId = async (id: number) => {
  const usuario = await prisma.usuariojwt.findUnique({ where: { id } });
  return usuario?.estado_auditoria === '1' ? usuario : null;
};

export const insertarUsuario = async (usuario: UsuarioJWT, ip: string) => {
  const hashedPassword = await hashPassword(usuario.password);

  const nuevoUsuario = await prisma.usuariojwt.create({
    data: {
      ...usuario,
      password: hashedPassword,
      ip_creacion: ip,
    },
  });

  const token = signToken({
    id: nuevoUsuario.id,
    username: nuevoUsuario.username,
    email: nuevoUsuario.email
  });

  return {
    message: 'Usuario registrado exitosamente',
    token,
  };
};

export const actualizarUsuario = async (id: number, usuario: UsuarioJWT) => {
  const existe = await prisma.usuariojwt.findUnique({ where: { id } });
  if (!existe || existe.estado_auditoria !== '1') return ;

  await prisma.usuariojwt.update({
    where: { id },
    data: {
      ...usuario,
      fecha_actualizacion: new Date()
    }
  });

  return RESPONSE_UPDATE_OK;
};

export const eliminarUsuarioLogico = async (id: number) => {
  const existe = await prisma.usuariojwt.findUnique({ where: { id } });
  if (!existe || existe.estado_auditoria !== '1') return ;

  await prisma.usuariojwt.update({
    where: { id },
    data: {
      estado_auditoria: '0',
      fecha_actualizacion: new Date()
    }
  });

  return RESPONSE_DELETE_OK;
};

// 🔐 AUTENTICACIÓN

export const login = async (username: string, password: string) => {
  const usuario = await prisma.usuariojwt.findFirst({
    where: {
      username,
      estado_auditoria: '1'
    }
  });

  if (!usuario) return RESPONSE_CREDENTIALS_ERROR;

  const passwordMatch = await comparePasswords(password, usuario.password);

  if (!passwordMatch) return RESPONSE_CREDENTIALS_ERROR;

  const token = signToken({
    id: usuario.id,
    username: usuario.username,
    email: usuario.email
  });

  return { token };
};
