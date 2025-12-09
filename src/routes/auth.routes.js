/**
 * Rutas públicas de autenticación (login, registro, logout).
 * @module routes/auth
 * @category Routes
 * @description Endpoints públicos para autenticación.
 */
const express = require('express');
const router = express.Router();
const { mostrarLogin, login, registrar, registro, logout } = require('../controllers/auth.controller');

router.get('/', mostrarLogin);
router.post('/login', login);

router.get('/registro',registrar );
router.post('/resgistro-back', registro);

router.get('/logout', logout)

module.exports = router;
//router.post('')