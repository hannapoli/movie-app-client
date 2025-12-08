// controllers/adminUsers.controller.js
const { conectar } = require('../../../helpers/fetch');
const urlBse = process.env.BACKEND_URL;
const { queId } = require('../../../middlewares/verificarToken');

const inicioUsuario = (req, res) =>{
  res.render('admin/user/UserindexPage', { title: 'PanelUser' });
};



const todosUsuarios = async (req, res) =>{
  try {
    const token = req.cookies.miToken;
    const idUser = queId(req);
    //console.log(idUser);
    const usuarios = await conectar(`${urlBse}usuario/todos/${idUser}`, 'GET', {}, token);
    console.log(usuarios.data);
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


const vistaCrearUsuario = (req, res) => {
  res.render('admin/user/createUserpage', {
    title: 'Crear usuario',
    role: 'admin'
  });
};

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
    console.log(datos);
    const actulizado = await conectar(`${urlBse}usuario/editar/${id}`,'PUT', datos, token); 
    console.log(actulizado);
    return res.render('admin/user/editUserpage', {
      title: 'Editar usuario',
      role: 'admin',
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
const eliminarUsuario = (req, res) =>{

};


module.exports = {
  todosUsuarios,
  inicioUsuario,
  vistaCrearUsuario,
  crearUsuario,
  editarUsuario,
  vistaEditarUsuario,
  eliminarUsuario
};
