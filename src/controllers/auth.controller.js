const { conectar } = require('../helpers/fetch');
const urlBase = process.env.BACKEND_URL;
const { queRol } = require('../middlewares/verificarToken')
const mostrarLogin = (req, res) => {
    const rol = queRol(req)
    //console.log(rol);
    if (req.cookies.miToken) {
        if(rol == "user"){
            return res.redirect('/user');
        } else if(rol == "administrador")
            return res.redirect('/admin/indexPage');
  }
    res.render('public/loginPage', { title: 'Login' });
};
const registrar = (req, res) =>{
    if (req.cookies.miToken) {
    return res.redirect('/user');
  }
    res.render('public/registerPage', { title: 'Register'})
}

const login = async (req, res) => {
    const datos = { "email": req.body.email, "contrasena": req.body.password }
    //console.log(datos);
    try {   
        const login = await conectar(`${urlBase}auth/login`, 'POST',datos);
        //console.log(login);
        const { user, token } = login
        //console.log(user);
        //console.log(token);
        res.cookie('miToken', token, {
            httpOnly: true,
            maxAge: 3600000,
        });

        if (user.role_usuario == "administrador" ) {
            res.redirect('/admin/indexPage');
        }else if(user.role_usuario == "user"){
            res.render('user/principalUserPage');
        }
    } catch (error) {
        console.log(error);
        res.render('public/loginPage', { title: 'Login', error: error.message });
    }
}

const registro = async (req, res) =>{
    const datos = { "nombre_usuario": req.body.username , "email": req.body.email, "contrasena": req.body.password }
    //console.log(datos);
    try {   
        const registrado = await conectar(`${urlBase}auth/signup`, 'POST',datos);
        //console.log(login);
        const { user, token } = registrado
        res.cookie('miToken', token, {
            httpOnly: true,
            maxAge: 3600000,
        });

        res.render('user/principalUserPage');

    } catch (error) {

    }   
}

const logout = async =(req, res) => {
  res.clearCookie('miToken');
  res.redirect('/');
}

module.exports = {
    mostrarLogin,
    login,
    registro,
    registrar,
    logout
}