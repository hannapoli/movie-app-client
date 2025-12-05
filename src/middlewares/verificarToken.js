const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET_KEY;

const verificarToken = (req, res, next) => {
    const token = req.cookies.miToken;
    if (!token) {
        return res.redirect('/');
    }
    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.redirect('/');
    }
}

const verificarRol = (rolDeAcceso) => {
    return function (req, res, next) {
        if (!req.user || req.user.role_usuario !== rolDeAcceso) {
            return res.status(403).send('Acceso denegado');
        }
        next();
    };
}

const queRol = (req) => {
  const token = req.cookies.miToken;
  if (!token) return undefined;
  try {
    const decoded = jwt.verify(token, SECRET);
    return decoded.role_usuario;
  } catch (error) {
    console.log(error)
    return undefined;
  }
};
module.exports = { verificarToken, verificarRol, queRol };