// routes/adminUsers.routes.js
const express = require('express');
const router = express.Router();
const { vistaCrearUsuario, crearUsuario, editarUsuario, vistaEditarUsuario } = require('../../../controllers/admin/user/adminUser.controller');

router.get('/user/create', vistaCrearUsuario);
router.post('/user/createback', crearUsuario);



router.get('/user/upgrade/:id', vistaEditarUsuario)

router.post('/user/upgrade', editarUsuario)


/* 
router.get('/user/delete', (req, res) =>{
    
})

router.post('/user/delete', (req, res) =>{

}) */


module.exports = router;