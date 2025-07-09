import { Request, Response } from "express";
import * as usuarioService from "../services/usuarioService";
import { usuarioCrearSchema } from "../schemas/usuarioSchema";
import { ResponseModel } from "../shared/responseModel";
import { STATUS_BAD_REQUEST, STATUS_INTERNAL_SERVER_ERROR, STATUS_NOT_FOUND } from "../shared/constants";

export const insertarUsuario = async (req: Request, res: Response): Promise<any> => {
    const { error } = usuarioCrearSchema.validate(req.body);
    if (error) {
        return res.status(STATUS_BAD_REQUEST).json(ResponseModel.error(error.message, STATUS_BAD_REQUEST));
    }
    try {
        const response = await usuarioService.insertarUsuario(req.body);
        res.json(ResponseModel.success(response));
    } catch (error: any) {
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error('Error al insertar usuario'));
    }
};

export const listarUsuarios = async (_req: Request, res: Response): Promise<any> => {
    try {
        const usuarios = await usuarioService.listarUsuarios();
        res.json(ResponseModel.success(usuarios));
    } catch (error: any) {
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error('Error al listar usuarios'));
    }
};

export const obtenerUsuario = async (req: Request, res: Response): Promise<any> => {
    console.log('usuarioController::obtenerUsuario');
    try {
        const { id } = req.params;
        const response = await usuarioService.obtenerUsuario(Number(id));

        if (!response) {
            return res.status(STATUS_NOT_FOUND).json(
                ResponseModel.error('Usuario no encontrado o ha sido eliminado', STATUS_NOT_FOUND)
            );
        }

        res.json(ResponseModel.success(response));
    } catch (error: any) {
        console.error(error.message);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
};


export const modificarUsuario = async (req: Request, res: Response): Promise<any> => {
    const { error } = usuarioCrearSchema.validate(req.body);
    if (error) {
        return res.status(STATUS_BAD_REQUEST).json(ResponseModel.error(error.message, STATUS_BAD_REQUEST));
    }
    try {
        const response = await usuarioService.modificarUsuario(Number(req.params.id), req.body);
        res.json(ResponseModel.success(response));
    } catch (error: any) {
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error('Error al modificar usuario'));
    }
};

export const eliminarUsuario = async (req: Request, res: Response): Promise<any> => {
    try {
        const response = await usuarioService.eliminarUsuario(Number(req.params.id));
        res.json(ResponseModel.success(response));
    } catch (error: any) {
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error('Error al eliminar usuario'));
    }
};