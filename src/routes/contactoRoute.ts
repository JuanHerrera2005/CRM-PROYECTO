import { Router } from 'express';
import {
    insertarContacto,
    listarContactos,
    obtenerContacto,
    modificarContacto,
    eliminarContacto
} from '../controllers/contactoController';
import { authMiddleware } from "../auth/auth.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Contacto
 *     description: Gestion de contactos
 */
 
 
/**
 * @swagger
 * /api/CRM/contactos:
 *   get:
 *     summary: Listar todos los contactos
 *     tags: [Contacto]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista obtenida correctamente
 */

router.post('/', authMiddleware, insertarContacto);

/**
 * @swagger
 * /api/CRM/contactos/{id}:
 *   get:
 *     summary: Obtener un contacto por ID
 *     tags: [Contacto]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del contacto a obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contacto obtenido correctamente
 */
router.get('/', authMiddleware, listarContactos);

/**
 * @swagger
 * /api/CRM/contactos:
 *   post:
 *     summary: Crear un nuevo contacto
 *     tags: [Contacto]
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
 *               - nombre
 *               - apellidos
 *               - tipoDocumentoId
 *               - numDocumento
 *               - cargo
 *               - email
 *             properties:
 *               clienteId:
 *                 type: integer
 *               nombre:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               tipoDocumentoId:
 *                 type: integer
 *               numDocumento:
 *                 type: string
 *               cargo:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               telefono:
 *                 type: string
 *                 description: Teléfono (opcional)
 *     responses:
 *       201:
 *         description: Contacto creado correctamente
 */

router.get('/:id', authMiddleware, obtenerContacto);

/**
 * @swagger
 * /api/CRM/contactos/{id}:
 *   put:
 *     summary: Modificar un contacto
 *     tags: [Contacto]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del contacto a modificar
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
 *               nombre:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               tipoDocumentoId:
 *                 type: integer
 *               numDocumento:
 *                 type: string
 *               cargo:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               telefono:
 *                 type: string
 *                 description: Teléfono (opcional)
 *     responses:
 *       200:
 *         description: Contacto modificado correctamente
 */

router.put('/:id', authMiddleware, modificarContacto);

/**
 * @swagger
 * /api/CRM/contactos/{id}:
 *   delete:
 *     summary: Eliminar un contacto
 *     tags: [Contacto]
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
router.delete('/:id', authMiddleware, eliminarContacto);

export default router;