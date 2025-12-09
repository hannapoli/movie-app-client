/**
 * Controlador de búsqueda y detalle de películas para usuario.
 * @module controllers/user/search
 * @category Controllers
 * @description Listado, búsqueda por título y detalle de películas.
 */
// Importaciones
const { conectar } = require('../../helpers/fetch'); // función de manejo del fetch para las peticiones HTTP
const urlBase = process.env.BACKEND_URL;

/**
 * Muestra la vista de listado inicial del buscador con todas las películas.
 * @param {Object} req
 * @param {Object} res
 */
const vistaBuscador = async (req, res) => {
    try {
        const token = req.cookies.miToken;
        const url = `${urlBase}peliculas`;
        const respuesta = await conectar(url, "GET", null, token);
        return res.render("user/allMoviesPage", {
            peliculas: respuesta.data || [],
            msg: null,
            backendUrl: urlBase
        });
    } catch (error) {
        console.log("Error en vistaBuscador:", error);
        res.status(500).send("Error mostrando buscador")
    }
};

/**
 * Busca películas por título y renderiza el listado con resultados.
 * @param {Object} req
 * @param {Object} res
 */
const buscarPeliculas = async (req, res) => {
    try {
        const token = req.cookies.miToken;
        const { tit_pelicula } = req.body;
        const url = `${urlBase}peliculas/busqueda`;
        const respuesta = await conectar(url, "POST", { tit_pelicula }, token);
        return res.render("user/allMoviesPage", {
            peliculas: respuesta.data || [],
            msg: null,
            backendUrl: urlBase
        });
    } catch (error) {
        console.log("Error en buscarPeliculas:", error);
        return res.render("user/allMoviesPage", {
            peliculas: [],
            msg: error?.msg || "No se encontraron resultados",
            backendUrl: urlBase
        });
    }
};

/**
 * Obtiene el detalle de una película por ID.
 * Intenta endpoint directo y, si falla, hace fallback al listado.
 * @param {Object} req
 * @param {Object} res
 */
const buscarPeliculaPorId = async (req, res) => {
    try {
        const token = req.cookies.miToken;
        const id = req.params.id;
        // Intento principal: endpoint público por id
        const url = `${urlBase}peliculas/${id}`;
        let respuesta;
        let pelicula = null;
        try {
            respuesta = await conectar(url, "GET", {}, token);
            if (respuesta && respuesta.ok !== false && respuesta.data) {
                pelicula = Array.isArray(respuesta.data) ? respuesta.data[0] : respuesta.data;
            }
        } catch (e) {
            // 404 u otro error: seguimos al fallback
        }

        // Fallback: cargar todas y filtrar por id si no hubo data
        if (!pelicula) {
            const urlAll = `${urlBase}peliculas`;
            const respAll = await conectar(urlAll, "GET", null, token);
            const arr = Array.isArray(respAll?.data) ? respAll.data : [];
            pelicula = arr.find(p => String(p.id_pelicula) === String(id)) || null;
        }

        if (!pelicula) {
            return res.render("user/MoviePage", {
                pelicula: null,
                msg: respuesta?.msg || "No se encontró la película",
                backendUrl: urlBase
            });
        }

        return res.render("user/MoviePage", {
            pelicula,
            msg: null,
            backendUrl: urlBase
        });
    } catch (error) {
        console.log("Error en buscarPeliculaPorId:", error?.message || error);
        return res.render("user/MoviePage", {
            pelicula: null,
            msg: "Error cargando detalles",
            backendUrl: urlBase
        });
    }
};


module.exports = {
    vistaBuscador,
    buscarPeliculas,
    buscarPeliculaPorId
}