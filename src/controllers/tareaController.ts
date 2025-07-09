import { Request, Response } from "express";
import * as tareaService from "../services/tareaService";
import { tareaCrearSchema } from "../schemas/tareaSchema";
import { ResponseModel } from "../shared/responseModel";
import { STATUS_BAD_REQUEST, STATUS_INTERNAL_SERVER_ERROR, STATUS_NOT_FOUND } from "../shared/constants";

export const insertarTarea = async (req: Request, res: Response): Promise<any> => {
    const { error } = tareaCrearSchema.validate(req.body);
    if (error) {
        return res.status(STATUS_BAD_REQUEST).json(ResponseModel.error(error.message, STATUS_BAD_REQUEST));
    }
    try {
        const response = await tareaService.insertarTarea(req.body);
        res.json(ResponseModel.success(response));
    } catch (error: any) {
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error('Error al insertar tarea'));
    }
};

export const listarTareas = async (_req: Request, res: Response): Promise<any> => {
    try {
        const tareas = await tareaService.listarTareas();
        res.json(ResponseModel.success(tareas));
    } catch (error: any) {
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error('Error al listar tareas'));
    }
};

export const obtenerTarea = async (req: Request, res: Response): Promise<any> => {
    console.log('tareaController::obtenerTarea');
    try {
        const { id } = req.params;
        const response = await tareaService.obtenerTarea(Number(id));

        if (!response) {
            return res.status(STATUS_NOT_FOUND).json(
                ResponseModel.error('Tarea no encontrada o ha sido eliminada', STATUS_NOT_FOUND)
            );
        }

        res.json(ResponseModel.success(response));
    } catch (error: any) {
        console.error(error.message);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
};


export const modificarTarea = async (req: Request, res: Response): Promise<any> => {
    const { error } = tareaCrearSchema.validate(req.body);
    if (error) {
        return res.status(STATUS_BAD_REQUEST).json(ResponseModel.error(error.message, STATUS_BAD_REQUEST));
    }
    try {
        const response = await tareaService.modificarTarea(Number(req.params.id), req.body);
        res.json(ResponseModel.success(response));
    } catch (error: any) {
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error('Error al modificar tarea'));
    }
};

export const eliminarTarea = async (req: Request, res: Response): Promise<any> => {
    try {
        const response = await tareaService.eliminarTarea(Number(req.params.id));
        res.json(ResponseModel.success(response));
    } catch (error: any) {
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error('Error al eliminar tarea'));
    }
};