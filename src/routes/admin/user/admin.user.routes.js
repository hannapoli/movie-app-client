/**
 * Rutas de administración de usuarios.
 * @module routes/admin/users
 * @category Routes
 * @description Endpoints para crear, editar, listar y eliminar usuarios.
 */
// routes/adminUsers.routes.js
const express = require('express');
const router = express.Router();
const { vistaCrearUsuario, crearUsuario, editarUsuario, vistaEditarUsuario, eliminarUsuario, todosUsuarios, inicioUsuario, vistaConfirmarEliminarUsuario } = require('../../../controllers/admin/user/adminUser.controller');
const { verificarToken, verificarRol } = require('../../../middlewares/verificarToken');

router.get('/',[verificarToken, verificarRol('administrador')], inicioUsuario);
router.get('/userall',[verificarToken, verificarRol('administrador')], todosUsuarios);

router.get('/usercrear',[verificarToken, verificarRol('administrador')], vistaCrearUsuario);
router.post('/userCreateback',[verificarToken, verificarRol('administrador')], crearUsuario);

router.get('/userUpgrade/:id',[verificarToken, verificarRol('administrador')], vistaEditarUsuario);
router.post('/userUpgrade/:id',[verificarToken, verificarRol('administrador')], editarUsuario);

router.get('/confirmar-eliminar/:id',[verificarToken, verificarRol('administrador')], vistaConfirmarEliminarUsuario);
router.post('/user/delete',[verificarToken, verificarRol('administrador')], eliminarUsuario);

module.exports = router;