const { conectar } = require('../helpers/fetch');
const urlBase = process.env.BACKEND_URL;

const mostrarLogin = (req, res) => {
    res.render('public/loginPage', { title: 'Login' });
};

const login = async (req, res) => {
    const datos = { "email": req.body.email, "password": req.body.password }
    //console.log(datos);
    try {   
        const login = await conectar(`http://localhost:4001/api/v1/auth/login`, 'POST', datos);
        console.log(login, "AAAAAAAAAAAAAAA");
        return res = login.msg
    } catch (error) {
        
    }

}


module.exports = {
    mostrarLogin,
    login

}