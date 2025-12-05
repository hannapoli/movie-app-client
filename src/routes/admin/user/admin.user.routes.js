// routes/adminUsers.routes.js
const express = require('express');
const router = express.Router();
const { vistaCrearUsuario, crearUsuario, editarUsuario, vistaEditarUsuario, eliminarUsuario, todosUsuarios, inicioUsuario } = require('../../../controllers/admin/user/adminUser.controller');

router.get('/', inicioUsuario);
router.get('/userall', todosUsuarios);
router.get('/usercrear', vistaCrearUsuario);
router.post('/user/createback', crearUsuario);



router.get('/user/upgrade/:id', vistaEditarUsuario)

router.post('/user/upgrade', editarUsuario)



router.get('/user/delete', eliminarUsuario)

/* router.post('/user/delete', (req, res) =>{

}) */ 


module.exports = router;