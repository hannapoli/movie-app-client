const { conectar } = require('../../helpers/fetch');
const { queId } = require('../../middlewares/verificarToken');
const urlBase = process.env.BACKEND_URL;

// 1. Mostrar todos los favoritos del usuario
const mostrarFavoritos = async (req, res) => {
	const token = req.cookies.miToken;
    const idUser = queId(req);
	try {
		const favoritos = await conectar(`${urlBase}favoritos/user/${idUser}`, 'GET', {}, token);
		console.log(favoritos);
		res.render('user/favoritosUserPage', {
			title: 'Mis Favoritos',
			favoritos: Array.isArray(favoritos.data) ? favoritos.data : [],
			error: null,
            backendUrl: process.env.BACKEND_URL
		});
	} catch (error) {
		console.log(error);
		res.render('user/favoritosUserPage', {
			title: 'Mis Favoritos',
			favoritos: [],
			error: 'No se pudieron cargar los favoritos'
		});
	}
};

// 2. Agregar a favoritos
const agregarFavorito = async (req, res) => {
	
};

// 3. Eliminar de favoritos
const eliminarFavorito = async (req, res) => {
	const token = req.cookies.miToken;
	const idUser = queId(req);
	const { idPelicula, idfavorito } = req.body;
    const datos = {
        id_favorito: parseInt(idfavorito, 10),
        id_pelicula: parseInt(idPelicula, 10),
        id_usuario: parseInt(idUser, 10)
    };
    console.log(datos)
	try {
		await conectar(`${urlBase}favoritos/eliminar`, 'DELETE', datos, token);
		return res.redirect('/user/userFavoritos');
	} catch (error) {
		console.log(error);
		res.render('user/favoritosUserPage', {
			title: 'Mis Favoritos',
			//favoritos: Array.isArray(favoritos.data) ? favoritos.data : [],
			error: 'No se pudo eliminar el favorito'
		});
	}
};

module.exports = { mostrarFavoritos, agregarFavorito, eliminarFavorito };