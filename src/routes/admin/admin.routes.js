/**
 * Rutas del panel admin.
 * @module routes/admin
 * @category Routes
 * @description Endpoints del dashboard principal de administración.
 */
const express = require('express');
const router = express.Router();
const { mostrarPanelAdmin  } = require('../../controllers/admin/panelAdmin.controller');
const { verificarToken, verificarRol } = require('../../middlewares/verificarToken');

router.get('/',[verificarToken,verificarRol('administrador')], mostrarPanelAdmin);



module.exports = router;