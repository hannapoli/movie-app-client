// routes/adminUsers.routes.js
const express = require('express');
const router = express.Router();
const { vistaCrearUsuario, crearUsuario, editarUsuario, vistaEditarUsuario, eliminarUsuario, todosUsuarios, inicioUsuario, vistaConfirmarEliminarUsuario } = require('../../../controllers/admin/user/adminUser.controller');

router.get('/', inicioUsuario);
router.get('/userall', todosUsuarios);

router.get('/usercrear', vistaCrearUsuario);
router.post('/userCreateback', crearUsuario);

router.get('/userUpgrade/:id', vistaEditarUsuario);
router.post('/userUpgrade/:id', editarUsuario);

router.get('/confirmar-eliminar/:id', vistaConfirmarEliminarUsuario);
router.post('/user/delete', eliminarUsuario);

/* router.post('/user/delete', (req, res) =>{

}) */ 


module.exports = router;