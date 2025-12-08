const { conectar } = require('../../../helpers/fetch');
const FormData = require('form-data');
const axios = require('axios');
const urlBase = process.env.BACKEND_URL;

const mostrarPeliculas = async (req, res) => {
    try {
        const respuesta = await conectar(`${urlBase}admin/peliculas`, 'GET', {}, req.cookies.miToken);
        const peliculas = respuesta.data;
        res.render('admin/movies/indexMoviesPage', {
            title: 'Dashboard películas',
            role: 'administrador',
            peliculas: peliculas || [],
            urlDelete: `${urlBase}admin/peliculas/`,
            backendUrl: process.env.BACKEND_URL
        })
        return peliculas;
    } catch (error) {
        res.render('admin/movies/indexMoviesPage', {
            title: 'Dashboard películas',
            role: 'administrador',
            peliculas: [],
            error: 'Error al cargar las películas'
        });
        console.error(error);
    }
};

const crearPeliculaForm = (req, res) => {

    res.render('admin/movies/createMoviePage', {
        title: 'Añadir una película',
        role: 'administrador'
    })
};

const crearPelicula = async (req, res) => {
    try {
        const formData = new FormData();

        formData.append('tit_pelicula', req.body.tit_pelicula);
        formData.append('director', req.body.director);
        formData.append('ano_pelicula', req.body.ano_pelicula);
        formData.append('genero', req.body.genero);
        formData.append('duracion', req.body.duracion);
        if (req.body.descripcion) {
            formData.append('descripcion', req.body.descripcion);
        }

        if (req.file) {
            formData.append('imagen', req.file.buffer, {
                filename: req.file.originalname,
                contentType: req.file.mimetype
            });
        }

        //Mandamos los datos al backend por axios
        const respuesta = await axios.post(`${urlBase}admin/peliculas`, formData, {
            headers: {
                'Authorization': `Bearer ${req.cookies.miToken}`,
                ...formData.getHeaders()
            }
        });

        console.log('respuesta:', respuesta.data);
        return res.redirect('/admin/movies');

    } catch (error) {
        console.error('Error completo:', error);
        console.error('Respuesta del backend:', error.response?.data);
        res.render('admin/movies/createMoviePage', {
            title: 'Añadir una película',
            role: 'administrador',
            error: error.response?.data?.errors || error.message
        });
    }
};

const editarPeliculaForm = async (req, res) => {
    try {
        const { id } = req.params;
        const respuesta = await conectar(`${urlBase}admin/peliculas/${id}`, 'GET', {}, req.cookies.miToken);
        const pelicula = respuesta.data[0];
        res.render('admin/movies/editMoviePage', {
            title: 'Modificar la película',
            role: 'administrador',
            pelicula,
            backendUrl: process.env.BACKEND_URL
        });
    } catch (error) {
        console.error(error);
        res.redirect('/admin/movies');
    };
};

const editarPelicula = async (req, res) => {
    try {
        const { id } = req.params;
        const formData = new FormData();

        formData.append('tit_pelicula', req.body.tit_pelicula);
        formData.append('director', req.body.director);
        formData.append('ano_pelicula', req.body.ano_pelicula);
        formData.append('genero', req.body.genero);
        formData.append('duracion', req.body.duracion);
        if (req.body.descripcion) {
            formData.append('descripcion', req.body.descripcion);
        }

        if (req.file) {
            formData.append('imagen', req.file.buffer, {
                filename: req.file.originalname,
                contentType: req.file.mimetype
            });
        }

        // Mandamos los datos al backend por axios
        const respuesta = await axios.put(`${urlBase}admin/peliculas/${id}`, formData, {
            headers: {
                'Authorization': `Bearer ${req.cookies.miToken}`,
                ...formData.getHeaders()
            }
        });

        console.log('resultado de editar película:', respuesta.data);
        return res.redirect('/admin/movies');

    } catch (error) {
        console.error(error);
        res.redirect('/admin/movies');
    }
};

const eliminarPeliculaForm = async (req, res) => {
    try {
        const { id } = req.params;
        const respuesta = await conectar(`${urlBase}admin/peliculas/${id}`, 'GET', {}, req.cookies.miToken);
        const pelicula = respuesta.data[0];
        res.render('admin/movies/deleteMoviePage', {
            title: 'Eliminar la película',
            role: 'administrador',
            pelicula,
            urlDelete: `${urlBase}admin/peliculas/`,
            backendUrl: process.env.BACKEND_URL
        })
    } catch (error) {
        console.error(error);
        res.redirect('/admin/movies');
    }
};

const eliminarPelicula = async (req, res) => {
    try {
        const { id } = req.params;
        const respuesta = await conectar(`${urlBase}admin/peliculas/${id}`, 'DELETE', {}, req.cookies.miToken);
        console.log(respuesta);
        return res.redirect('/admin/movies');
    } catch (error) {
        console.error(error);
        res.redirect('/admin/movies');
    }
};

module.exports = { mostrarPeliculas, crearPeliculaForm, crearPelicula, editarPeliculaForm, editarPelicula, eliminarPeliculaForm, eliminarPelicula };