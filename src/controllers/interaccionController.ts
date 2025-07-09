import { Request, Response } from "express";
import * as interaccionService from "../services/interaccionService";
import { interaccionCrearSchema } from "../schemas/interaccionSchema";
import { ResponseModel } from "../shared/responseModel";
import { STATUS_BAD_REQUEST, STATUS_INTERNAL_SERVER_ERROR, STATUS_NOT_FOUND } from "../shared/constants";

export const insertarInteraccion = async (req: Request, res: Response): Promise<any> => {
    const { error } = interaccionCrearSchema.validate(req.body);
    if (error) {
        return res.status(STATUS_BAD_REQUEST).json(ResponseModel.error(error.message, STATUS_BAD_REQUEST));
    }
    try {
        const response = await interaccionService.insertarInteraccion(req.body);
        res.json(ResponseModel.success(response));
    } catch (error: any) {
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error('Error al insertar interacción'));
    }
};

export const listarInteracciones = async (_req: Request, res: Response): Promise<any> => {
    try {
        const interacciones = await interaccionService.listarInteracciones();
        res.json(ResponseModel.success(interacciones));
    } catch (error: any) {
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error('Error al listar interacciones'));
    }
};

export const obtenerInteraccion = async (req: Request, res: Response): Promise<any> => {
    console.log('interaccionController::obtenerInteraccion');
    try {
        const { id } = req.params;
        const response = await interaccionService.obtenerInteraccion(Number(id));

        if (!response) {
            return res.status(STATUS_NOT_FOUND).json(
                ResponseModel.error('Interacción no encontrada o ha sido eliminada', STATUS_NOT_FOUND)
            );
        }

        res.json(ResponseModel.success(response));
    } catch (error: any) {
        console.error(error.message);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
};


export const modificarInteraccion = async (req: Request, res: Response): Promise<any> => {
    const { error } = interaccionCrearSchema.validate(req.body);
    if (error) {
        return res.status(STATUS_BAD_REQUEST).json(ResponseModel.error(error.message, STATUS_BAD_REQUEST));
    }
    try {
        const response = await interaccionService.modificarInteraccion(Number(req.params.id), req.body);
        res.json(ResponseModel.success(response));
    } catch (error: any) {
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error('Error al modificar interacción'));
    }
};

export const eliminarInteraccion = async (req: Request, res: Response): Promise<any> => {
    try {
        const response = await interaccionService.eliminarInteraccion(Number(req.params.id));
        res.json(ResponseModel.success(response));
    } catch (error: any) {
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error('Error al eliminar interacción'));
    }
};