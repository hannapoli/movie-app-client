const { useId } = require('react');
const { conectar } = require('../helpers/fetch');
const urlBase = process.env.BACKEND_URL;


// Mostrar la vista de los favoritos
const vistaFavoritos = async (req, res) =>{
    try {
        // obtener id del ususario desde el middleware
        const userId = req.user.uid;

        // Obtener token de las  cookies para la petición a la api
        const token = req.cookies.miToken;

        // construir la URL d ela api
        const url = `${urlBase}favoritos/user/${userId}`;

        // Hace la petición a la api con su metodo. (no envia body)
        const respuesta = await conectar(url, "GET", null, token);

        // Si el usuario no tiene favoritos
        if (!respuesta.data || respuesta.data.length === 0){
            return res.render("user/allMoviesPage", {
                peliculas: [],
                msg: "Aún no tienes películas en favoritos."
            });           
        }

        // Obtener el array real de peliculas
        const peliculas = respuesta.data.peliculas;

        // renderizar la vista con las peliculas
        return res.render("user/allMoviesPage", {
            peliculas,
            msg: null
        });

    } catch (error) {
        console.log("Error en vistaFavoritos:", error);
        return res.status(500).send("Error cargando favoritos");
    }
};


// Crear un favorito
const crearFavorito = async (req, res) => {
    try {
        // Obtener datos necesarios
        const movieId = req.params.movieId; // ID de la película, deste URL
        const userId = req.user.uid;
        const token = req.cookies.miToken;

        // Construir URL del backend
        const url = `${urlBase}favorito/crear`

        // Crear el cuerpo que la petición necesita
        const body = {
            id_pelicula: movieId,
            id_usuario: userId
        };

        // Llamar a la api real con su metodo
        const respuesta = await conectar(url, "POST", body, token);

        // Comprobar que la api responde con ok false 
        if (!respuesta.ok) {
            return res.render("user/MoviePage", {
                msg: respuesta.msg || "No se pudo añadir a favorito",
                pelicula: null
            });
        }

        // Si todo salio bien llevar a favoritos
        return res.redirect("/user/favoritos");

    } catch (error) {
        console.log("Error en crearFavorito:", error);
        // devolver status 500 por error inesperado
        return res.status(500).send("Error al añadir favorito")
    }
};


// Eliminar un Favorito
const eliminarFavorito = async (req, res) => {
    try {
        // Obtener datos necesarios
        const movieId = req.params.movieId; 
        const userId = req.user.uid;
        const token = req.cookies.miToken;
        const idFavorito = req.body.id_favorito; // id del favorito a eliminar

        // Validación previa
        if (!idFavorito) {
            return res.status(400).send("Falta id_favorito para eliminar");
        }

        // Construir URL del backend
        const url = `${urlBase}favorito/eliminar/${idFavorito}`;

        // Crear el cuerpo que la petición necesita el backend: (deberia ser unicamente el id_favorito)
        const body = {
            id_favorito: idFavorito,
            id_pelicula: movieId,
            id_usuario: userId
        };

        // Llamar a la api real con su metodo
        const respuesta = await conectar(url, "DELETE", body, token);

        // Comprobar que la api responde con ok false 
        if (!respuesta.ok) {
            return res.render("user/AllMoviesPage", {
                peliculas: [],
                msg: respuesta.msg || "No se pudo eliminar el favorito",
            });
        }

        // Si todo salio bien redirigir con pagina actualizada
        return res.redirect("/user/favoritos");

    } catch (error) {
        console.log("Error en eliminarFavorito:", error);
        // devolver status 500 por error inesperado
        return res.status(500).send("Error al eliminar favorito")
    }
}

module.exports={
    vistaFavoritos,
    crearFavorito,
    eliminarFavorito
}