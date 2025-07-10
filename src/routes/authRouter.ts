import { Router } from 'express';
import * as controller from '../auth/auth.controller';
import { authMiddleware } from '../auth/auth.middleware';

const router = Router();

// Públicas

/**
 * @swagger
 * tags:
 *   - name: UsuarioJWT
 *     description: Gestion de Usuarios JWT
 */

/**
 * @swagger
 * /api/CRM/auth/login:
 *   post:
 *     summary: Logear  usuario JWT
 *     tags: [UsuarioJWT]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario JWT creado correctamente
 */
router.post('/login', controller.loginUsuario);           // POST /auth/login

/**
 * @swagger
 * /api/CRM/auth/register:
 *   post:
 *     summary: Crear un nuevo usuario JWT
 *     tags: [UsuarioJWT]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario JWT creado correctamente
 */
router.post('/register', controller.insertarUsuario); // POST /auth/register

 
 

router.use(authMiddleware);


/**
 * @swagger
 * /api/CRM/auth:
 *   get:
 *     summary: Listar todos los usuarios JWT
 *     tags: [UsuarioJWT]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista obtenida correctamente
 */

// Protegidas
router.get('/', controller.listarUsuarios);            // GET /auth/

/**
 * @swagger
 * /api/CRM/auth/{id}:
 *   get:
 *     summary: Obtener un usuario JWT por ID
 *     tags: [UsuarioJWT]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuarios JWT a obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: UsuarioJWT obtenido correctamente
 */
router.get('/:id', controller.buscarUsuarioPorId);     // GET /auth/:id

/**
 * @swagger
 * /api/CRM/auth/{id}:
 *   delete:
 *     summary: Eliminar un usuario JWT
 *     tags: [UsuarioJWT]
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
router.delete('/:id', controller.eliminarUsuario);     // DELETE /auth/:id

export default router;
