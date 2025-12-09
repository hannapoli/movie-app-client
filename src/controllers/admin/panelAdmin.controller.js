/**
 * Controlador del panel administrativo.
 * @module controllers/admin/panel
 * @category Controllers
 * @description Controla la página principal del panel de administración.
 */
const mostrarPanelAdmin = (req, res) => {
    res.render('admin/indexPage', { title: 'Panel' });
};



module.exports = {
    mostrarPanelAdmin
}