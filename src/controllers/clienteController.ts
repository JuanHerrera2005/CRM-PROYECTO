// src/controllers/ClienteController.ts
import { Request, Response } from "express";
import * as clienteService from "../services/clienteService";
import { clienteCrearSchema } from "../schemas/clienteSchema";
import { ResponseModel } from "../shared/responseModel";
import { STATUS_BAD_REQUEST, STATUS_INTERNAL_SERVER_ERROR, STATUS_NOT_FOUND } from "../shared/constants";


export const insertarCliente = async (req: Request, res: Response): Promise<any> => {
    console.log('clienteController::insertarCliente');
    const { error }: any = clienteCrearSchema.validate(req.body);
    if (error) {
        return res.status(STATUS_BAD_REQUEST).json(ResponseModel.error(error.message, STATUS_BAD_REQUEST));
    }
    try {
        const response = await clienteService.insertarCliente(req.body);
        res.json(ResponseModel.success(response));
    } catch (error: any) {
        if (error.code === 'P2002' && error.meta?.target?.includes('ruc')) {
            return res.status(STATUS_BAD_REQUEST).json(ResponseModel.error('El RUC ya está registrado. Debe ser único.', STATUS_BAD_REQUEST));
        }
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
};

export const listarClientes = async (_req: Request, res: Response): Promise<any> => {
    console.log('clienteController::listarClientes');
    try {
        const response = await clienteService.listarClientes();
        res.json(ResponseModel.success(response));
    } catch (error: any) {
        console.error(error.message);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
};

export const obtenerCliente = async (req: Request, res: Response): Promise<any> => {
    console.log('clienteController::obtenerCliente');
    try {
        const { id } = req.params;
        const response = await clienteService.obtenerCliente(Number(id));
                if (!response) {
            return res.status(STATUS_NOT_FOUND).json(
                ResponseModel.error('Cliente no encontrado o ha sido eliminado', STATUS_NOT_FOUND)
            );
        }

        res.json(ResponseModel.success(response));
    } catch (error: any) {
        console.error(error.message);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
};

export const modificarCliente = async (req: Request, res: Response): Promise<any> => {
    console.log('clienteController::modificarCliente');
    const { error }: any = clienteCrearSchema.validate(req.body);
    if (error) {
        return res.status(STATUS_BAD_REQUEST).json(ResponseModel.error(error.message, STATUS_BAD_REQUEST));
    }
    try {
        const response = await clienteService.modificarCliente(Number(req.params.id), req.body);
        res.json(ResponseModel.success(response));
    } catch (error: any) {
        console.error(error.message);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
};

export const eliminarCliente = async (req: Request, res: Response): Promise<any> => {
    console.log('clienteController::eliminarCliente');
    try {
        const { id } = req.params;
        const response = await clienteService.eliminarCliente(Number(id));
        res.json(ResponseModel.success(response));
    } catch (error: any) {
        console.error(error.message);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
};
