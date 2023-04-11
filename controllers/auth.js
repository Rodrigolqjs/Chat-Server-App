const { response } = require("express");
const User = require('../models/user');
const bcryp = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt')

const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;
    try {

        const existeEmail = await User.findOne({email});
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }
        //* Guardado en DB
        const user = new User(req.body);
        //
        //* Encriptar contraseña
        const salt = bcryp.genSaltSync();
        user.password = bcryp.hashSync(password, salt);
        //
        await user.save();

        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            msg: user,
            token: token,
        });

    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }





}

const login = async (req, res = response) => {

    const { email, password } = req.body;
    try {
        const dbUser = await User.findOne({email});
        if (dbUser) {
            if (bcryp.compareSync(req.body.password, dbUser.password)) {
                const token = await generateJWT(dbUser.id);
                return res.json({
                    ok: true,
                    user: dbUser,
                    token: token,
                });
            } else {
            return res.status(400).json({
                ok: false,
                msg: 'Error en el Login'
            });
          }
        } else {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario no encontrado'
            });
        }
    } catch(error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const renewToken = async (req, res = response) => {

    const uid = req.uid;
    const token = await generateJWT(uid);
    const user = await User.findById(uid);

    res.json({
        ok: true,
        user: user,
        token: token,
    });
};

module.exports = {
    crearUsuario,
    login,
    renewToken,
}