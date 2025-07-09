import { Router } from "express";
import {
  insertarTarea,
  listarTareas,
  obtenerTarea,
  modificarTarea,
  eliminarTarea
} from "../controllers/tareaController";
import { authMiddleware } from "../auth/auth.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Tarea
 *     description: Gestion de tareas
 */
 
 
/**
 * @swagger
 * /api/CRM/tareas:
 *   get:
 *     summary: Listar todos las tareas
 *     tags: [Tarea]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista obtenida correctamente
 */

router.post('/', authMiddleware, insertarTarea);

/**
 * @swagger
 * /api/CRM/tareas/{id}:
 *   get:
 *     summary: Obtener una tarea por ID
 *     tags: [Tarea]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea a obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarea obtenida correctamente
 */
router.get('/', authMiddleware, listarTareas);

/**
 * @swagger
 * /api/CRM/tareas:
 *   post:
 *     summary: Crear una nueva tarea
 *     tags: [Tarea]
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
 *               - titulo
 *               - estado
 *             properties:
 *               clienteId:
 *                 type: integer
 *               titulo:
 *                 type: string
 *               fechaVencimiento:
 *                 type: string
 *                 format: date
 *                 description: Fecha de vencimiento (opcional)
 *               estado:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tarea creada correctamente
 */

router.get('/:id', authMiddleware, obtenerTarea);

/**
 * @swagger
 * /api/CRM/tareas/{id}:
 *   put:
 *     summary: Modificar una tarea
 *     tags: [Tarea]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la tarea a modificar
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
 *               titulo:
 *                 type: string
 *               fechaVencimiento:
 *                 type: string
 *                 format: date
 *                 description: Fecha de vencimiento (opcional)
 *               estado:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tarea modificada correctamente
 */

router.put('/:id', authMiddleware, modificarTarea);

/**
 * @swagger
 * /api/CRM/tareas/{id}:
 *   delete:
 *     summary: Eliminar una tarea
 *     tags: [Tarea]
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
router.delete('/:id', authMiddleware, eliminarTarea);

export default router;
