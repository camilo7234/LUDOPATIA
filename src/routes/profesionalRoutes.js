// src/routes/profesionalRoutes.js
const express = require('express');
const router = express.Router();
const profesionalController = require('../controllers/profesionalController');

// Rutas
router.get('/', profesionalController.getAllProfessionals);

module.exports = router;
