// controllers/adminUsers.controller.js
const { conectar } = require('../../../helpers/fetch');
const urlBse = process.env.BACKEND_URL;

const vistaCrearUsuario = (req, res) => {
  res.render('admin/user/createUserpage', {
    title: 'Crear usuario',
    role: 'admin'
  });
};

const crearUsuario = async (req, res) => {
  const datos = {
    nombre_usuario: req.body.nombre_usuario,
    email: req.body.email,
    role_usuario: req.body.role_usuario,
    contrasena: req.body.contrasena
  };
  //console.log(datos);

  try {
    const respuesta = await conectar(`${urlBse}user/create`, method = 'POST', body= req.body, token);

    //console.log(respuesta);
    return res.redirect('/admin/user/list'); 
  } catch (error) {
    console.log( error);
    return res.status(500).render('admin/user/createUserpage', {
      title: 'Crear usuario',
      role: 'admin',
      error: 'Error al crear usuario'
    });
  }
};

module.exports = {
  vistaCrearUsuario,
  crearUsuario
};
