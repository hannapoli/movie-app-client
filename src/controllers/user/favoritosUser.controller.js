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

const agregarFavorito = async (req, res) => {
	const token = req.cookies.miToken;
	const idUser = queId(req);
	const { idPelicula } = req.body;
	const datos = {
		id_pelicula: parseInt(idPelicula, 10),
		id_usuario: parseInt(idUser, 10)
	};
	try {
		const respuesta = await conectar(`${urlBase}favorito/crear`, 'POST', datos, token);
		if (!respuesta?.ok) {
			return res.render('user/favoritosUserPage', {
				title: 'Mis Favoritos',
				favoritos: [],
				error: respuesta?.msg || 'No se pudo agregar a favoritos'
			});
		}
		return res.redirect('/user/userFavoritos');
	} catch (error) {
		console.log('Error agregarFavorito:', error);
		return res.render('user/favoritosUserPage', {
			title: 'Mis Favoritos',
			favoritos: [],
			error: 'Error al agregar favorito'
		});
	}
};

// 3. Eliminar de favoritos
const eliminarFavorito = async (req, res) => {
	const token = req.cookies.miToken;
	const { idfavorito } = req.body;
	const idFavorito = parseInt(idfavorito, 10);
	if (!idFavorito || Number.isNaN(idFavorito)) {
		return res.render('user/favoritosUserPage', {
			title: 'Mis Favoritos',
			favoritos: [],
			error: 'Falta id_favorito válido para eliminar'
		});
	}
	try {
		const body = {
			id_favorito: idFavorito,
			id_pelicula: parseInt(req.body.idPelicula, 10),
			id_usuario: parseInt(queId(req), 10)
		};
		const respuesta = await conectar(`${urlBase}favorito/eliminar/${idFavorito}`, 'DELETE', body, token);
		if (!respuesta?.ok) {
			return res.render('user/favoritosUserPage', {
				title: 'Mis Favoritos',
				favoritos: [],
				error: respuesta?.msg || 'No se pudo eliminar el favorito'
			});
		}
		return res.redirect('/user/userFavoritos');
	} catch (error) {
		console.log('Error eliminarFavorito:', error);
		return res.render('user/favoritosUserPage', {
			title: 'Mis Favoritos',
			favoritos: [],
			error: 'Error al eliminar favorito'
		});
	}
};

module.exports = { mostrarFavoritos, agregarFavorito, eliminarFavorito };