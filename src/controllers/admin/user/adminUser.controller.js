// controllers/adminUsers.controller.js
const { conectar } = require('../../../helpers/fetch');
const urlBse = process.env.BACKEND_URL;

const inicioUsuario = (req, res) =>{
  res.render('admin/user/UserindexPage', { title: 'PanelUser' });
};

const todosUsuarios = (req, res) =>{
  res.render('admin/user/allUserpage', { title: 'PanelUserAll' });
};

const vistaCrearUsuario = (req, res) => {
  res.render('admin/user/createUserpage', {
    title: 'Crear usuario',
    role: 'admin'
  });
};

const crearUsuario = async (req, res) => {
  console.log(req.body,'req')
  //console.log(req.file,'file')
  const datos = {
    "nombre_usuario": req.body.nombre_usuario,
    "email": req.body.email,
    "role_usuario": req.body.role_usuario,
    "contrasena": req.body.contrasena
  };
  console.log(datos, "desde datos");

  try {
    const respuesta = await conectar(`${urlBse}usuario/crear`, method = 'POST', body= req.body, token);

    console.log(respuesta);
    return res.redirect('/user/create'); 
  } catch (error) {
    console.log( error);
    return res.status(500).render('admin/user/createUserpage', {
      title: 'Crear usuario',
      role: 'admin',
      error: 'Error al crear usuario'
    });
  }
};

const vistaEditarUsuario = (req, res) =>{
    
};
const editarUsuario = async (req, res) =>{

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
