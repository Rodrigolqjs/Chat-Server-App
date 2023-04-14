const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(payload, process.env.JWTKEY, {
            expiresIn: '24h',
        }, (error, token) => {
            if(error) {
                reject('No se pudo crear el token');
            } else {
                resolve(token)
            }
        })
    });
}

const validateSocketJWT = (token = '') => {
    try{
        const { uid } = jwt.verify(token, process.env.JWTKEY);
        return [true, uid];
    } catch(error) {
        return [false];
    }
}

module.exports = {
    generateJWT,
    validateSocketJWT,
}