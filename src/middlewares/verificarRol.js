const verificarRol = (rolDeAcceso) => {

    return (req, res) => {
        try {
            // const { role, name } = req.userToken;
            //pasar el rol por cookies del Token al logearse
            // const rol = req.cookies.role;
            if (!role || role !== rolDeAcceso) {
                return res.status(403).json({
                    ok: false,
                    msg: "Error: el acceso está restringido."
                });
            };
            console.log(`Hola, ${name}, bienvenid@ a la sección de ${role}.`)
            next();
        } catch (error) {
            console.log(error);
        }

    }
}

module.exports = { verificarRol };