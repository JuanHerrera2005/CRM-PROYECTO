import { Router } from "express";
import {
  insertarUsuario,
  listarUsuarios,
  obtenerUsuario,
  modificarUsuario,
  eliminarUsuario
} from "../controllers/usuarioController";
import { authMiddleware } from "../auth/auth.middleware";


const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Usuario
 *     description: Gestion de usuarios
 */
 
 
/**
 * @swagger
 * /api/CRM/usuarios:
 *   get:
 *     summary: Listar todos los usuarios
 *     tags: [Usuario]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista obtenida correctamente
 */

router.post('/', authMiddleware, insertarUsuario);

/**
 * @swagger
 * /api/CRM/usuarios/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Usuario]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario obtenido correctamente
 */
router.get('/', authMiddleware, listarUsuarios);

/**
 * @swagger
 * /api/CRM/usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuario]
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
 *               - apellidos
 *               - tipoDocumentoId
 *               - numeroDocumento
 *               - email
 *               - password
 *             properties:
 *               nombre:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               tipoDocumentoId:
 *                 type: integer
 *               numeroDocumento:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 */

router.get('/:id', authMiddleware, obtenerUsuario);

/**
 * @swagger
 * /api/CRM/usuarios/{id}:
 *   put:
 *     summary: Modificar un usuario
 *     tags: [Usuario]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del usuario a modificar
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
 *               apellidos:
 *                 type: string
 *               tipoDocumentoId:
 *                 type: integer
 *               numeroDocumento:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario modificado correctamente
 */

router.put('/:id', authMiddleware, modificarUsuario);

/**
 * @swagger
 * /api/CRM/usuarios/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [Usuario]
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
router.delete('/:id', authMiddleware, eliminarUsuario);

export default router;