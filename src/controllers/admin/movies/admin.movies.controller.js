const { conectar } = require('../../../helpers/fetch');
const urlBase = process.env.BACKEND_URL;

const peliculas = [
    {
        id: 1,
        titulo: 'El Padrino',
        director: 'Francis Ford Coppola',
        ano: 1972,
        genero: 'Crimen',
        duracion: 175,
        imagen: ''
    },
    {
        id: 2,
        titulo: 'La La Land',
        director: 'Damien Chazelle',
        ano: 2016,
        genero: 'Musical',
        duracion: 128,
        imagen: ''
    }
];

const mostrarPeliculas = async (req, res) => {

    // const pelis = await conectar(`${urlBase}/peliculas`, {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         // 'Authorization': `Bearer ${req.cookies.token}`
    //     }
    // });
    // console.log(pelis);

    res.render('admin/movies/indexMoviesPage', {
        title: 'Dashboard películas',
        role: 'administrador',
        peliculas
    })
    try {
    } catch (error) {
        console.error(error);
    };
}

const mostrarFormCrearPelicula = (req, res) => {

    res.render('admin/movies/createMoviePage', {
        title: 'Añadir una película',
        role: 'administrador'
    })

};

const submitCrearPelicula = async (req, res) => {

    try {
        const nuevaPelicula = req.body;

        const response = await conectar(`${urlBase}/peliculas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${req.cookies.token}`
            }
        });
        console.log(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al crear la película'
        });
    }

}

const mostrarFormEditarPelicula = async (req, res) => {
    //LLAMAR Al LA API QUE DEVUELVE ESA PELICULA POR SU ID
    // const pelicula = await conectar(`${urlBase}/peliculas/:id`, {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         // 'Authorization': `Bearer ${req.cookies.token}`
    //     }
    // });
    // console.log(pelicula);

    // res.render('admin/movies/indexMoviesPage', {
    //     title: 'Modificar la película',
    //     role: 'administrador',
    //     pelicula: {
    //         id: 1,
    //         titulo: 'El Padrino',
    //         director: 'Francis Ford Coppola',
    //         ano: 1972,
    //         genero: 'Crimen',
    //         duracion: 175,
    //         imagen: ''
    //     }
    // })

        const pelicula = {
        id: 1,
        titulo: 'El Padrino',
        director: 'Francis Ford Coppola',
        ano: 1972,
        genero: 'Crimen',
        duracion: 175,
        imagen: ''
    };
    res.render('admin/movies/editMoviePage', {
        title: 'Modificar la película',
        role: 'administrador',
        pelicula
    });

    try {
    } catch (error) {
        console.error(error);
    };
};



module.exports = { mostrarPeliculas, mostrarFormCrearPelicula, submitCrearPelicula, mostrarFormEditarPelicula };