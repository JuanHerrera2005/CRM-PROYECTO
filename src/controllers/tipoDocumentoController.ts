import { Request, Response } from "express";
import * as tipoDocumentoService from "../services/tipoDocumentoService";
import { tipodocumentoCrearSchema } from "../schemas/tipodocumentoSchema";
import { ResponseModel } from "../shared/responseModel";
import { STATUS_BAD_REQUEST, STATUS_INTERNAL_SERVER_ERROR, STATUS_NOT_FOUND } from "../shared/constants";

export const insertarTipoDocumento = async (req: Request, res: Response): Promise<any> => {
    const { error } = tipodocumentoCrearSchema.validate(req.body);
    if (error) {
        return res.status(STATUS_BAD_REQUEST).json(ResponseModel.error(error.message, STATUS_BAD_REQUEST));
    }
    try {
        const response = await tipoDocumentoService.insertarTipoDocumento(req.body);
        res.json(ResponseModel.success(response));
    } catch (error: any) {
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error('Error al insertar tipo de documento'));
    }
};

export const listarTipoDocumentos = async (_req: Request, res: Response): Promise<any> => {
    try {
        const tipos = await tipoDocumentoService.listarTiposDocumento();
        res.json(ResponseModel.success(tipos));
    } catch (error: any) {
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error('Error al listar tipos de documento'));
    }
};

export const obtenerTipoDocumento = async (req: Request, res: Response): Promise<any> => {
    console.log('tipoDocumentoController::obtenerTipoDocumento');
    try {
        const { id } = req.params;
        const response = await tipoDocumentoService.obtenerTipoDocumento(Number(id));

        if (!response) {
            return res.status(STATUS_NOT_FOUND).json(
                ResponseModel.error('Tipo de documento no encontrado o ha sido eliminado', STATUS_NOT_FOUND)
            );
        }

        res.json(ResponseModel.success(response));
    } catch (error: any) {
        console.error(error.message);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
};


export const modificarTipoDocumento = async (req: Request, res: Response): Promise<any> => {
    const { error } = tipodocumentoCrearSchema.validate(req.body);
    if (error) {
        return res.status(STATUS_BAD_REQUEST).json(ResponseModel.error(error.message, STATUS_BAD_REQUEST));
    }
    try {
        const response = await tipoDocumentoService.modificarTipoDocumento(Number(req.params.id), req.body);
        res.json(ResponseModel.success(response));
    } catch (error: any) {
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error('Error al modificar tipo de documento'));
    }
};

export const eliminarTipoDocumento = async (req: Request, res: Response): Promise<any> => {
    try {
        const response = await tipoDocumentoService.eliminarTipoDocumento(Number(req.params.id));
        res.json(ResponseModel.success(response));
    } catch (error: any) {
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error('Error al eliminar tipo de documento'));
    }
};