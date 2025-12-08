const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const { mostrarPeliculas, crearPeliculaForm, crearPelicula, editarPeliculaForm, editarPelicula, eliminarPeliculaForm, eliminarPelicula } = require('../../../controllers/admin/movies/admin.movies.controller');
const { verificarToken, verificarRol } = require('../../../middlewares/verificarToken');


//Ruta del panel de películas
router.get('/', [verificarToken, verificarRol('administrador')], mostrarPeliculas);

//La vista con el formuairo de crear películas
router.get('/create', [verificarToken, verificarRol('administrador')], crearPeliculaForm);

//Getionar los datos del formulaio por post
router.post('/create', upload.single('imagen'), [verificarToken, verificarRol('administrador')], crearPelicula)

//Mostrar la vista con el formuairo de editar por get
router.get('/edit/:id', [verificarToken, verificarRol('administrador')], editarPeliculaForm)

//Modificar los datos de la película:
router.put('/edit/:id', [verificarToken, verificarRol('administrador')], editarPelicula);

//Mostrar la película por el id para eliminar:
router.get('/delete/:id', [verificarToken, verificarRol('administrador')], eliminarPeliculaForm);

//Eliminar la película por el id:
router.delete('/delete/:id', [verificarToken, verificarRol('administrador')], eliminarPelicula);

module.exports = router;

