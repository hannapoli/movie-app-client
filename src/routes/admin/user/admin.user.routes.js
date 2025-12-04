// routes/adminUsers.routes.js
const express = require('express');
const router = express.Router();
const { vistaCrearUsuario, crearUsuario } = require('../../../controllers/admin/user/adminUser.controller');

router.get('/user/create', vistaCrearUsuario);
router.post('/user/create', crearUsuario);



/* router.get('/user/upgrade/:id', (req, res) =>{
    
})

router.post('/user/upgrade', (req, res) =>{
    //recoger el req body

    //lamar por fetch al endpoint de actualizar

})



router.get('/user/delete', (req, res) =>{
    
})

router.post('/user/delete', (req, res) =>{

}) */


module.exports = router;