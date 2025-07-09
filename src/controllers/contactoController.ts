import { Request, Response } from "express";
import * as contactoService from "../services/contactoService";
import { contactoCrearSchema } from "../schemas/contactoSchema";
import { ResponseModel } from "../shared/responseModel";
import { STATUS_BAD_REQUEST, STATUS_INTERNAL_SERVER_ERROR, STATUS_NOT_FOUND } from "../shared/constants";

export const insertarContacto = async (req: Request, res: Response): Promise<any> => {
  const { error } = contactoCrearSchema.validate(req.body);
  if (error) {
    return res.status(STATUS_BAD_REQUEST).json(ResponseModel.error(error.message, STATUS_BAD_REQUEST));
  }
  try {
    const response = await contactoService.insertarContacto(req.body);
    res.json(ResponseModel.success(response));
  } catch (error: any) {
    res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error('Error al insertar contacto'));
  }
};

export const listarContactos = async (_req: Request, res: Response): Promise<any> => {
  try {
    const contactos = await contactoService.listarContactos();
    res.json(ResponseModel.success(contactos));
  } catch (error: any) {
    res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error('Error al listar contactos'));
  }
};

export const obtenerContacto = async (req: Request, res: Response): Promise<any> => {
  console.log('contactoController::obtenerContacto');
  try {
    const { id } = req.params;
    const response = await contactoService.obtenerContacto(Number(id));

    if (!response) {
      return res.status(STATUS_NOT_FOUND).json(
        ResponseModel.error('Contacto no encontrado o ha sido eliminado', STATUS_NOT_FOUND)
      );
    }

    res.json(ResponseModel.success(response));
  } catch (error: any) {
    console.error(error.message);
    res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
  }
};


export const modificarContacto = async (req: Request, res: Response): Promise<any> => {
  const { error } = contactoCrearSchema.validate(req.body);
  if (error) {
    return res.status(STATUS_BAD_REQUEST).json(ResponseModel.error(error.message, STATUS_BAD_REQUEST));
  }
  try {
    const response = await contactoService.modificarContacto(Number(req.params.id), req.body);
    res.json(ResponseModel.success(response));
  } catch (error: any) {
    res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error('Error al modificar contacto'));
  }
};

export const eliminarContacto = async (req: Request, res: Response): Promise<any> => {
  try {
    const response = await contactoService.eliminarContacto(Number(req.params.id));
    res.json(ResponseModel.success(response));
  } catch (error: any) {
    res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error('Error al eliminar contacto'));
  }
};