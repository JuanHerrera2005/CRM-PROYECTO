import { Router } from 'express';
import {
  insertarOportunidad,
  listarOportunidades,
  obtenerOportunidad,
  modificarOportunidad,
  eliminarOportunidad
} from "../controllers/oportunidadController";
import { authMiddleware } from "../auth/auth.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Oportunidad
 *     description: Gestion de oportunidades
 */
 
 
/**
 * @swagger
 * /api/CRM/oportunidades:
 *   get:
 *     summary: Listar todos las oportunidades
 *     tags: [Oportunidad]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista obtenida correctamente
 */

router.post('/', authMiddleware, insertarOportunidad);

/**
 * @swagger
 * /api/CRM/oportunidades/{id}:
 *   get:
 *     summary: Obtener una oportunidad por ID
 *     tags: [Oportunidad]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la oportunidad a obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Oportunidad obtenida correctamente
 */
router.get('/', authMiddleware, listarOportunidades);

/**
 * @swagger
 * /api/CRM/oportunidades:
 *   post:
 *     summary: Crear una nueva oportunidad
 *     tags: [Oportunidad]
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
 *               - usuarioId
 *               - titulo
 *               - estado
 *             properties:
 *               clienteId:
 *                 type: integer
 *               usuarioId:
 *                 type: integer
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               montoEstimado:
 *                 type: number
 *                 format: float
 *               estado:
 *                 type: string
 *               fechaCierreEstimada:
 *                 type: string
 *                 format: date
 *                 description: Fecha estimada de cierre (opcional)
 *     responses:
 *       201:
 *         description: Oportunidad creada correctamente
 */

router.get('/:id', authMiddleware, obtenerOportunidad);

/**
 * @swagger
 * /api/CRM/oportunidades/{id}:
 *   put:
 *     summary: Modificar una oportunidad
 *     tags: [Oportunidad]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la oportunidad a modificar
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
 *               usuarioId:
 *                 type: integer
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               montoEstimado:
 *                 type: number
 *                 format: float
 *               estado:
 *                 type: string
 *               fechaCierreEstimada:
 *                 type: string
 *                 format: date
 *                 description: Fecha estimada de cierre (opcional)
 *     responses:
 *       200:
 *         description: Oportunidad modificada correctamente
 */

router.put('/:id', authMiddleware, modificarOportunidad);

/**
 * @swagger
 * /api/CRM/oportunidades/{id}:
 *   delete:
 *     summary: Eliminar una oportunidad
 *     tags: [Oportunidad]
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
router.delete('/:id', authMiddleware, eliminarOportunidad);

export default router;