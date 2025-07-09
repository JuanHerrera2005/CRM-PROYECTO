// routes/tipo-documento.routes.ts
import { Router } from 'express';
import {
  insertarTipoDocumento,
  listarTipoDocumentos,
  obtenerTipoDocumento,
  modificarTipoDocumento,
  eliminarTipoDocumento
} from "../controllers/tipoDocumentoController";
import { authMiddleware } from "../auth/auth.middleware";


const router = Router();

/**
 * @swagger
 * tags:
 *   - name: TipoDocumento
 *     description: Gestion de tipos de documentos
 */
 
 
/**
 * @swagger
 * /api/CRM/tipo-documentos:
 *   get:
 *     summary: Listar todos los tipos de documento
 *     tags: [TipoDocumento]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista obtenida correctamente
 */

// Rutas para TipoDocumento
router.post('/', authMiddleware, insertarTipoDocumento);

/**
 * @swagger
 * /api/CRM/tipo-documentos/{id}:
 *   get:
 *     summary: Obtener un tipo de documento por ID
 *     tags: [TipoDocumento]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del tipo de documento a obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tipo de documento obtenido correctamente
 */
router.get('/', authMiddleware, listarTipoDocumentos);

/**
 * @swagger
 * /api/CRM/tipo-documentos:
 *   post:
 *     summary: Crear un nuevo tipo de documento
 *     tags: [TipoDocumento]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tipo de documento creado correctamente
 */
router.get('/:id', authMiddleware, obtenerTipoDocumento);

/**
 * @swagger
 * /api/CRM/tipo-documentos/{id}:
 *   put:
 *     summary: Modificar un tipo de documento
 *     tags: [TipoDocumento]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
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
 *     responses:
 *       200:
 *         description: Tipo de documento modificado
 */
router.put('/:id', authMiddleware, modificarTipoDocumento);

/**
 * @swagger
 * /api/CRM/tipo-documentos/{id}:
 *   delete:
 *     summary: Eliminar un tipo de documento
 *     tags: [TipoDocumento]
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
router.delete('/:id', authMiddleware, eliminarTipoDocumento);

export default router;