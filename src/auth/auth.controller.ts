import { usuariojwt } from './../../node_modules/.prisma/client/index.d';
import { Request, Response } from 'express';
import * as service from '../auth/auth.service';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export const loginUsuario = async (req: Request, res: Response) : Promise<any>=> {
  const { username, password } = req.body;
  const result = await service.login(username, password);

  if (typeof result === 'string') {
    return res.status(401).json({ message: result });
  }

  return res.json(result);
};
export const listarUsuarios = async (_: Request, res: Response) => {
  const data = await service.listarUsuarios();
  res.json(data);
};

export const buscarUsuarioPorId = async (req: Request, res: Response) => {
  const usuario = await service.buscarUsuarioPorId(Number(req.params.id));
  res.json(usuario ?? { message: 'Usuario no encontrado' });
};

export const insertarUsuario = async (req: Request, res: Response)  : Promise<any>=> {
const desde = new Date(Date.now() - 24 * 60 * 60 * 1000);
const ip = req.ip || '0.0.0.0';
  const cantidad = await prisma.usuariojwt.count({
    where: {
      estado_auditoria: '1',
      ip_creacion: ip,
       fecha_creacion: {
      gte: desde
    }
    }
  });

  if (cantidad >= 3) {
    return res.status(429).json({
      message: 'Límite de creación de cuentas alcanzado desde esta IP.'
    });
  }

  const result = await service.insertarUsuario(req.body, ip);
  res.json(result);
};
export const actualizarUsuario = async (req: Request, res: Response) => {
  const response = await service.actualizarUsuario(Number(req.params.id), req.body);
  res.json({ message: response });
};

export const eliminarUsuario = async (req: Request, res: Response) => {
  const response = await service.eliminarUsuarioLogico(Number(req.params.id));
  res.json({ message: response });
};
