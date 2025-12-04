const { conectar } = require('../helpers/fetch');
const urlBase = process.env.BACKEND_URL;

const mostrarLogin = (req, res) => {
    res.render('public/loginPage', { title: 'Login' });
};

const login = async (req, res) => {
    const datos = { "email": req.body.email, "password": req.body.password }
    try {   
        const login = await conectar(`http://localhost:4001/api/v1/auth/login`, 'POST',datos);
        if (login.success) {
            return  console.log("SIII funciono");//res.redirect('/admin');
        } else {
            return  console.log("no funciono");//res.render('public/loginPage', { title: 'Login', error: loginResp.msg });
        }
    } catch (error) {
        
    }

}


module.exports = {
    mostrarLogin,
    login

}