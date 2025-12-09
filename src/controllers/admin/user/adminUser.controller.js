/**
 * Controladores de administración de usuarios.
 * @module controllers/admin/users
 * @category Controllers
 * @description Vistas y acciones de gestión de usuarios para administradores.
 */
// controllers/adminUsers.controller.js
const { conectar } = require('../../../helpers/fetch');
const urlBse = process.env.BACKEND_URL;
const { queId } = require('../../../middlewares/verificarToken');

/**
 * Renderiza la portada del panel de administración de usuarios.
 * @param {Object} req
 * @param {Object} res
 */
const inicioUsuario = (req, res) =>{
  res.render('admin/user/UserindexPage', { title: 'PanelUser' });
};



/**
 * Lista todos los usuarios (visibles para el admin autenticado).
 * Consulta `${BACKEND_URL}usuario/todos/:idAdmin`.
 * @param {Object} req
 * @param {Object} res
 */
const todosUsuarios = async (req, res) =>{
  try {
    const token = req.cookies.miToken;
    const idUser = queId(req);
    //console.log(idUser);
    const usuarios = await conectar(`${urlBse}usuario/todos/${idUser}`, 'GET', {}, token);
    //console.log(usuarios.data);
    res.render('admin/user/allUserpage', {
      title: 'PanelUserAll',
      usuarios: usuarios.data,
    });
  } catch (error) {
    console.log(error);
    res.render('admin/user/allUserpage', {
      title: 'PanelUserAll',
      error: 'No se pudieron cargar los usuarios',
    });
  }
}


/**
 * Muestra el formulario de creación de usuario.
 * @param {Object} req
 * @param {Object} res
 */
const vistaCrearUsuario = (req, res) => {
  res.render('admin/user/createUserpage', {
    title: 'Crear usuario',
    role: 'admin'
  });
};

/**
 * Crea un nuevo usuario vía backend.
 * Espera en el body: nombre_usuario, email, role_usuario, contrasena.
 * @param {Object} req
 * @param {Object} res
 */
const crearUsuario = async (req, res) => {
  //console.log('Body recibido en crearUsuario:', req.body);
  const datos = {
    nombre_usuario: req.body.nombre_usuario,
    email: req.body.email,
    role_usuario: req.body.role_usuario,
    contrasena: req.body.contrasena
  };
  //console.log('Datos preparados para enviar:', datos);
  const token = req.cookies.miToken;
  console.log(token);
  try {
    const respuesta = await conectar(`${urlBse}usuario/crear`, 'POST', datos, token);
    //console.log('Respuesta del backend:', respuesta);
    return res.render('admin/user/createUserpage', {
      title: 'Crear usuario',
      role: 'admin',
      success: 'El usuario se creó exitosamente.'
    });
  } catch (error) {
    console.log(error);
    return res.status(500).render('admin/user/createUserpage', {
      title: 'Crear usuario',
      role: 'admin',
      error: `Error al crear usuario: ${error}`
    });
  }
};

/**
 * Muestra el formulario de edición de usuario.
 * Lee `req.params.id` y obtiene datos actuales del usuario.
 * @param {Object} req
 * @param {Object} res
 */
const vistaEditarUsuario = async (req, res) =>{
  const token = req.cookies.miToken;
  const { id } = req.params
  const usuario = await conectar(`${urlBse}usuario/obtener/${id}`,'GET',{},token);
  //console.log(usuario);
  return res.render('admin/user/editUserpage', {
    title: 'PanelEditarUser',
    usuario: usuario[0],
  })
};
/**
 * Actualiza un usuario vía backend.
 * @param {Object} req
 * @param {Object} res
 */
const editarUsuario = async (req, res) =>{
  const token = req.cookies.miToken;
  const { id } = req.params
  const datos = {
    nombre_usuario: req.body.nombre_usuario,
    email: req.body.email,
    role_usuario: req.body.role_usuario,
    contrasena: req.body.contrasena
  };
  try {
    //console.log(datos);
    const actulizado = await conectar(`${urlBse}usuario/editar/${id}`,'PUT', datos, token); 
    //console.log(actulizado);
    const usuarioActualizado = await conectar(`${urlBse}usuario/obtener/${id}`,'GET',{},token);
    return res.render('admin/user/editUserpage', {
      title: 'Editar usuario',
      role: 'admin',
      usuario: usuarioActualizado[0],
      success: 'El usuario se edito exitosamente.'
    });
  } catch (error) {
    console.log(error);
    return res.status(500).render('admin/user/editUserpage', {
      title: 'Crear usuario',
      role: 'admin',
      error: `Error al editar usuario: ${error}`
    });
  }
};
/**
 * Elimina un usuario por id.
 * Body: { id, email }.
 * @param {Object} req
 * @param {Object} res
 */
const eliminarUsuario = async (req, res) => {
  const token = req.cookies.miToken;
  const data =
  { id_usuario: req.body.id, 
    email: req.body.email }
  try {
    const respuesta = await conectar(`${urlBse}usuario/eliminar`, 'DELETE', data , token);
      // Redirige o muestra mensaje de éxito
      return res.redirect('/admin/user/userall');
  } catch (error) {
    console.log(error);
    return res.status(500).render('admin/user/allUserpage', {
      title: 'PanelUserAll',
      error: 'Error al eliminar usuario',
      usuarios: []
    });
  }
};
/**
 * Renderiza la vista de confirmación de eliminación.
 * Obtiene usuario por `req.params.id`.
 * @param {Object} req
 * @param {Object} res
 */
const vistaConfirmarEliminarUsuario = async (req, res) => {
  const token = req.cookies.miToken;
  const { id } = req.params;
  const usuario = await conectar(`${urlBse}usuario/obtener/${id}`,'GET',{},token);
  res.render('admin/user/confirmarEliminarUserpage', {
    title: 'Confirmar eliminación',
    usuario: usuario[0]
  });
};


module.exports = {
  todosUsuarios,
  inicioUsuario,
  vistaCrearUsuario,
  crearUsuario,
  editarUsuario,
  vistaEditarUsuario,
  eliminarUsuario,
  vistaConfirmarEliminarUsuario
};
