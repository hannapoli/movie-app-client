const mostrarPaginaPrincipal = (req, res) => {
    res.render('user/principalUserPage', { title: 'Principal' });
};

module.exports = {
    mostrarPaginaPrincipal
}