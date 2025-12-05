const express = require('express');
const router = express.Router();
const { vistaFavoritos,crearFavoritos } = require("../../controllers/user/user.favoritos.controller")

router.post("/user/fav",  vistaFavoritos);
router.get("/user/favorito",  crearFavoritos);







module.exports = router;