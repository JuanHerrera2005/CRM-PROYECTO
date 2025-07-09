import { Router } from "express";
import {
  insertarInteraccion,
  listarInteracciones,
  obtenerInteraccion,
  modificarInteraccion,
  eliminarInteraccion
} from "../controllers/interaccionController";
import { authMiddleware } from "../auth/auth.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Interaccion
 *     description: Gestion de interacciones
 */
 
 
/**
 * @swagger
 * /api/CRM/interacciones:
 *   get:
 *     summary: Listar todos las interacciones
 *     tags: [Interaccion]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista obtenida correctamente
 */

router.post('/', authMiddleware, insertarInteraccion);

/**
 * @swagger
 * /api/CRM/interacciones/{id}:
 *   get:
 *     summary: Obtener una interaccion por ID
 *     tags: [Interaccion]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la interaccion a obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Interaccion obtenida correctamente
 */
router.get('/', authMiddleware, listarInteracciones);

/**
 * @swagger
 * /api/CRM/interacciones:
 *   post:
 *     summary: Crear una nueva interaccion
 *     tags: [Interaccion]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - clienteId
 *               - tipo
 *             properties:
 *               clienteId:
 *                 type: integer
 *               fecha:
 *                 type: string
 *                 format: date
 *                 description: Fecha de la interacción (opcional)
 *               tipo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *                 description: Descripción de la interacción (opcional)
 *     responses:
 *       201:
 *         description: Interacción creada correctamente
 */

router.get('/:id', authMiddleware, obtenerInteraccion);

/**
 * @swagger
 * /api/CRM/interacciones/{id}:
 *   put:
 *     summary: Modificar una interaccion
 *     tags: [Interaccion]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la interacción a modificar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clienteId:
 *                 type: integer
 *               fecha:
 *                 type: string
 *                 format: date
 *                 description: Fecha de la interacción (opcional)
 *               tipo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *                 description: Descripción de la interacción (opcional)
 *     responses:
 *       200:
 *         description: Interacción modificada correctamente
 */

router.put('/:id', authMiddleware, modificarInteraccion);

/**
 * @swagger
 * /api/CRM/interacciones/{id}:
 *   delete:
 *     summary: Eliminar una interaccion
 *     tags: [Interaccion]
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
router.delete('/:id', authMiddleware, eliminarInteraccion);

export default router;
