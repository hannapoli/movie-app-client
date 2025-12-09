/**
 * Controlador de la página principal de usuario.
 * @module controllers/user/home
 * @category Controllers
 * @description Renderiza la portada del área de usuario.
 */
const mostrarPaginaPrincipal = (req, res) => {
    res.render('user/principalUserPage', { title: 'Principal' });
};

module.exports = {
    mostrarPaginaPrincipal
}