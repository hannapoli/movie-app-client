const mostrarPanelAdmin = (req, res) => {
    res.render('admin/indexPage', { title: 'Panel' });
};



module.exports = {
    mostrarPanelAdmin
}