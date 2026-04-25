const express = require("express");

const {
  getAdoptions,
  getAdoptionById,
  createAdoption,
  updateAdoptionStatus,
  deleteAdoption
} = require("../controllers/adoption.controller");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Adoptions
 *   description: Endpoints para gestionar solicitudes de adopción
 */

/**
 * @swagger
 * /api/adoptions:
 *   get:
 *     summary: Obtener todas las solicitudes de adopción
 *     tags: [Adoptions]
 *     responses:
 *       200:
 *         description: Lista de adopciones obtenida correctamente
 */
router.get("/", getAdoptions);

/**
 * @swagger
 * /api/adoptions/{id}:
 *   get:
 *     summary: Obtener una solicitud de adopción por ID
 *     tags: [Adoptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Adopción encontrada
 *       404:
 *         description: Adopción no encontrada
 */
router.get("/:id", getAdoptionById);

/**
 * @swagger
 * /api/adoptions:
 *   post:
 *     summary: Crear una solicitud de adopción
 *     tags: [Adoptions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               petName:
 *                 type: string
 *               petType:
 *                 type: string
 *               adopterName:
 *                 type: string
 *               adopterEmail:
 *                 type: string
 *             example:
 *               petName: Rocky
 *               petType: dog
 *               adopterName: Juan Perez
 *               adopterEmail: juan@test.com
 *     responses:
 *       201:
 *         description: Solicitud creada correctamente
 *       400:
 *         description: Datos incompletos
 */
router.post("/", createAdoption);

/**
 * @swagger
 * /api/adoptions/{id}/status:
 *   put:
 *     summary: Actualizar estado de una solicitud de adopción
 *     tags: [Adoptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, approved, rejected]
 *             example:
 *               status: approved
 *     responses:
 *       200:
 *         description: Estado actualizado correctamente
 *       400:
 *         description: Estado inválido
 *       404:
 *         description: Adopción no encontrada
 */
router.put("/:id/status", updateAdoptionStatus);

/**
 * @swagger
 * /api/adoptions/{id}:
 *   delete:
 *     summary: Eliminar una solicitud de adopción
 *     tags: [Adoptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 2
 *     responses:
 *       200:
 *         description: Solicitud eliminada correctamente
 *       404:
 *         description: Adopción no encontrada
 */
router.delete("/:id", deleteAdoption);

module.exports = router;