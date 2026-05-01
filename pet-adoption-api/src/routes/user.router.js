const express = require("express");

const {
  getUsers,
  getUserById
} = require("../controllers/user.controller");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints para consultar usuarios
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente
 */
router.get("/", getUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */
router.get("/:id", getUserById);

module.exports = router;