// Importaciones
const { conectar } = require('../../helpers/fetch'); // función de manejo del fetch para las peticiones HTTP
const urlBase = process.env.BACKEND_URL;

// Mostrar la vista allMoviePage del usuario (para cuando entre al buscador)
const vistaBuscador = async (req, res) => {
    try {
        // Devolver la vista renderizada
        return res.render("user/allMoviesPages", {
            peliculas: [],
            msg: null
        });
    } catch (error) {
        console.log("Error en vistaBuscador:", error);
        res.status(500).send("Error mostrando buscador")
    }
};

// 
const buscarPeliculas = async (req, res) => {
    try {
        
    } catch (error) {
        console.log("Error en buscarPeliculas:", error);
        res.status(500).send("Error buscando peliculas")        
    }
};


module.exports = {
    vistaBuscador,
    buscarPeliculas
}