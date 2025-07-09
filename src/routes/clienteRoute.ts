import { Router } from 'express';
import {
  insertarCliente,
  listarClientes,
  obtenerCliente,
  modificarCliente,
  eliminarCliente
} from '../controllers/clienteController';
import { authMiddleware } from "../auth/auth.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Cliente
 *     description: Gestion de clientes
 */
 
 
/**
 * @swagger
 * /api/CRM/clientes:
 *   get:
 *     summary: Listar todos los clientes
 *     tags: [Cliente]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista obtenida correctamente
 */

router.post('/', authMiddleware, insertarCliente);

/**
 * @swagger
 * /api/CRM/clientes/{id}:
 *   get:
 *     summary: Obtener un cliente por ID
 *     tags: [Cliente]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del cliente a obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cliente obtenido correctamente
 */
router.get('/', authMiddleware, listarClientes);

/**
 * @swagger
 * /api/CRM/clientes:
 *   post:
 *     summary: Crear un nuevo cliente
 *     tags: [Cliente]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - RUC
 *               - email
 *               - telefono
 *             properties:
 *               nombre:
 *                 type: string
 *               ruc:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               telefono:
 *                 type: string
 *               fechaCreacionEmpresa:
 *                 type: string
 *                 format: date
 *                 description: Fecha de creación de la empresa (opcional)
 *     responses:
 *       201:
 *         description: Cliente creado correctamente
 */

router.get('/:id', authMiddleware, obtenerCliente);

/**
 * @swagger
 * /api/CRM/clientes/{id}:
 *   put:
 *     summary: Modificar un cliente
 *     tags: [Cliente]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del cliente a modificar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               ruc:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               telefono:
 *                 type: string
 *               fechaCreacionEmpresa:
 *                 type: string
 *                 format: date
 *                 description: Fecha de creación de la empresa (opcional)
 *     responses:
 *       200:
 *         description: Cliente modificado correctamente
 */

router.put('/:id', authMiddleware, modificarCliente);

/**
 * @swagger
 * /api/CRM/clientes/{id}:
 *   delete:
 *     summary: Eliminar un cliente
 *     tags: [Cliente]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Eliminado correctamente
 */
router.delete('/:id', authMiddleware, eliminarCliente);

export default router;
