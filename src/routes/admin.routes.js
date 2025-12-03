const express = require('express');
const router = express.Router();

//renderizar dashboard con acceso al panel de gestión de usuarios y gestion de peliss
router.get('/', (req, res) => { })


//ruta del panel de pelis => titulo y el role

router.get('/pelis', (req, res) => {

    //rol cookies


    res.render('admin/indexFilmsPage', {
        title: 'Dashboard films',
        role: 'admin'
    })


})

//mostrar vista con el formuairo de crear por get
router.get('/pelis/create', (req, res) => {

    //rol cookies

    res.render('admin/createFilmPage', {
        title: 'Create films',
        role: 'admin'
    })

})

//getionar los datos del formulaio por post
router.post('/pelis/create', (req, res) => {

    console.log('gestionando fetch')
    console.log(req.body)

    // req.body

    // llama a la api por fetch

    //rol cookies




})

//mostrar vista con el formuairo de editar por get
router.get('/pelis/edit', (req, res) => {

    //LLAMAR Al LA API QUE DEVUELVE ESA PELICULA POR SU ID

    res.render('admin/createFilmPage', {
        title: 'Create films',
        role: 'admin',
        peli: {
            id: 1,
            titulo: 'este es el titulo'
        }
    })

})


//ruta panel usuarios  => titulo y el role

module.exports = router;