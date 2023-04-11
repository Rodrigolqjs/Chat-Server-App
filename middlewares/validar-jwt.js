const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {

    const token = req.header('x-token');
    if(!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No se envio el token'
        });
    }

    try{
        const { uid } = jwt.verify(token, process.env.JWTKEY);
        req.uid = uid;
        next();
    } catch(error) {
        return res.status(401).json({
            ok: false,
            msg: 'token no valido'
        });
    }
}

module.exports = validateJWT;
