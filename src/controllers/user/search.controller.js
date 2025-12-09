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
    const token = req.cookies.miToken;
    const id = req.params.id;
    //console.log(id)
    const byIdUrl = `${urlBase}peliculas/${id}`;

    try {
        const resp = await conectar(byIdUrl, "GET", null, token);
        const datos = resp.data[0];
        //console.log(resp);
        //console.log(datos);
        return res.render("user/MoviePage", {
            pelicula: datos || null,
            msg: datos ? null : "No se encontró la película",
            backendUrl: urlBase
        });
    } catch (error) {
        console.log("Error en buscarPeliculaPorId:", error?.message || error);
        return res.render("user/MoviePage", {
            pelicula: null,
            msg: "No se encontró la película",
            backendUrl: urlBase
        });
    }
};


module.exports = {
    vistaBuscador,
    buscarPeliculas,
    buscarPeliculaPorId
}