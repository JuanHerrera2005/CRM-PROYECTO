import { Request, Response } from "express";
import * as oportunidadService from "../services/oportunidadService";
import { oportunidadCrearSchema } from "../schemas/oportunidadSchema";
import { ResponseModel } from "../shared/responseModel";
import { STATUS_BAD_REQUEST, STATUS_INTERNAL_SERVER_ERROR, STATUS_NOT_FOUND } from "../shared/constants";

export const insertarOportunidad = async (req: Request, res: Response): Promise<any> => {
    const { error } = oportunidadCrearSchema.validate(req.body);
    if (error) {
        return res.status(STATUS_BAD_REQUEST).json(ResponseModel.error(error.message, STATUS_BAD_REQUEST));
    }
    try {
        const response = await oportunidadService.insertarOportunidad(req.body);
        res.json(ResponseModel.success(response));
    } catch (error: any) {
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error('Error al insertar oportunidad'));
    }
};

export const listarOportunidades = async (_req: Request, res: Response): Promise<any> => {
    try {
        const oportunidades = await oportunidadService.listarOportunidades();
        res.json(ResponseModel.success(oportunidades));
    } catch (error: any) {
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error('Error al listar oportunidades'));
    }
};

export const obtenerOportunidad = async (req: Request, res: Response): Promise<any> => {
    console.log('oportunidadController::obtenerOportunidad');
    try {
        const { id } = req.params;
        const oportunidad = await oportunidadService.obtenerOportunidad(Number(id));

        if (!oportunidad) {
            return res.status(STATUS_NOT_FOUND).json(
                ResponseModel.error('Oportunidad no encontrada o ha sido eliminada', STATUS_NOT_FOUND)
            );
        }

        res.json(ResponseModel.success(oportunidad));
    } catch (error: any) {
        console.error(error.message);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
};


export const modificarOportunidad = async (req: Request, res: Response): Promise<any> => {
    const { error } = oportunidadCrearSchema.validate(req.body);
    if (error) {
        return res.status(STATUS_BAD_REQUEST).json(ResponseModel.error(error.message, STATUS_BAD_REQUEST));
    }
    try {
        const response = await oportunidadService.modificarOportunidad(Number(req.params.id), req.body);
        res.json(ResponseModel.success(response));
    } catch (error: any) {
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error('Error al modificar oportunidad'));
    }
};

export const eliminarOportunidad = async (req: Request, res: Response): Promise<any> => {
    try {
        const response = await oportunidadService.eliminarOportunidad(Number(req.params.id));
        res.json(ResponseModel.success(response));
    } catch (error: any) {
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error('Error al eliminar oportunidad'));
    }
};