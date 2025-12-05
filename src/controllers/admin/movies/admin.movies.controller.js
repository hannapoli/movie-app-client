const { conectar } = require('../../../helpers/fetch');
const urlBase = process.env.BACKEND_URL;
// let token = req.cookies.token;

// const peliculas = [
//     {
//         id: 1,
//         titulo: 'El Padrino',
//         director: 'Francis Ford Coppola',
//         ano: 1972,
//         genero: 'Crimen',
//         duracion: 175,
//         imagen: ''
//     },
// ];

const mostrarPeliculas = async (req, res) => {
    try {
        const peliculas = await conectar(`${urlBase}/peliculas`, 'GET', {}, req.cookies.token);
        res.render('admin/movies/indexMoviesPage', {
            title: 'Dashboard películas',
            role: 'administrador',
            peliculas,
            urlDelete: `${urlBase}/peliculas/`
        })
        return peliculas;
    } catch (error) {
        console.error(error);
    }
};

const createPeliculaForm = (req, res) => {

    res.render('admin/movies/createMoviePage', {
        title: 'Añadir una película',
        role: 'administrador',
        urlCreate: `${urlBase}/admin/peliculas`
    })
};

const crearPelicula = async (req, res) => {

    try {
        const peliCreada = await conectar(`${urlBase}/admin/peliculas`, 'POST', req.body, req.cookies.token);
        console.log(peliCreada);
        return peliCreada;
    } catch (error) {
        console.error(error);
    }
};

const editarPeliculaForm = async (req, res) => {
    try {
        const pelicula = await conectar(`${urlBase}/admin/peliculas/:id'`, 'GET', {}, req.cookies.token);
        console.log(peliEditar);
        res.render('admin/movies/editMoviePage', {
            title: 'Modificar la película',
            role: 'administrador',
            urlEdit: `${urlBase}/admin/peliculas`,
            pelicula, 
        });
    } catch (error) {
        console.error(error);
    };
};

const editarPelicula = async (req, res) => {
    try {
        const pelicula = await conectar(`${urlBase}/admin/peliculas/:id'`, 'PUT', req.body, req.cookies.token);
        return pelicula;
    } catch (error) {
        console.error(error);
    }
};

const eliminarPeliculaForm = async (req, res) => {
    try {
        const pelicula = await conectar(`${urlBase}/admin/peliculas/:id'`, 'GET', req.body, req.cookies.token);
        res.render('admin/movies/deleteMoviePage', {
            title: 'Eliminar la película',
            role: 'administrador',
            pelicula,
            urlDelete: `${urlBase}/admin/peliculas/`
        })
    } catch (error) {
        console.error(error);
    }
};

const eliminarPelicula = async (req, res) => {
    try {
        const pelicula = await conectar(`${urlBase}/admin/peliculas/:id'`, 'DELETE', req.body, req.cookies.token);
        console.log(peliEditar);
        return pelicula;
    } catch (error) {
        console.error(error);
    }
};

module.exports = { mostrarPeliculas, createPeliculaForm, crearPelicula, editarPeliculaForm, editarPelicula, eliminarPeliculaForm, eliminarPelicula };