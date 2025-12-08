const { conectar } = require("../../helpers/fetch");
const urlBase = process.env.BACKEND_URL;

// Buscar películas por títulos
const buscarPeliculas = async (req, res) => {
    try {
        // Obtener datos necesarios
        const token = req.cookies.miToken;
        const titulo = req.query.title || "";

        // Construir URL del backend
        const url = `${urlBase}peliculas/titulo/${titulo}`;

        // Llamar a la api real con su metodo
        const respuesta = await conectar(url, "GET", null, token);

        // Renderizar el resultado de busqueda
        return res.render("user/allMoviesPage", {
            peliculas: respuesta.data || [],
            msg: null
        });
        
    } catch (error) {
        console.log("Error en buscarPeliculas:", error);
        return res.status(500).send("Error cargando películas");
    }
};

// Buscar detalles de una pelicula
const buscarPeliculaPorId = async (req, res) => {
    try {
        // Obtener datos necesarios
        const token = req.cookies.miToken;
        const id = req.params.id;

        // Construir URL del backend
        const url = `${urlBase}peliculas/${id}`;

        // Llamar a la api real con su metodo
        const respuesta = await conectar(url, "GET", null, token);

        // renderizar la pagina detalle de peliculas
        return res.render("user/MoviePage", {
            pelicula: respuesta.data || null,
            msg: null
        });
        
    } catch (error) {
        console.log("Error en buscarPeliculaPorId:", error);
        return res.status(500).send("Error cargando detalles");
    }
};

module.exports = {
    buscarPeliculas,
    buscarPeliculaPorId
}