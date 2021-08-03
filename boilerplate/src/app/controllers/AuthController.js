const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const { jwtSecret } = require('../../config/vars');

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.query().where('email', email).first();

        if(user && (await bcrypt.compare(password, user.password))) {
            user.token = signJwt(user);
            return res.status(200).json(user);
        }

        return res.status(400).json({
            error: 'Incorrect username or password'
        });
    } catch(e) {
        if(e.statusCode === 400) {
            return res.status(400).json(e.data)
        }

        return res.status(500).json({
            error: 'Internal Server Error'
        })
    }
}

exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const oldUser = await User.query().where('email', email).first();

        if(oldUser) {
            return res.status(409).json({
                error: 'User already exists'
            })
        }

        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = await User.query().insert({
            name,
            email,
            password: encryptedPassword
        });

        user.token = signJwt(user);

        return res.status(201).json(user);
    } catch(e) {
        if (e.statusCode === 400) {
            return res.status(400).json(e.data)
        }

        return res.status(500).json({
            error: 'Internal Server Error'
        })
    }
}

function signJwt(user) {
    return jwt.sign(
        user.toJSON(),
        jwtSecret,
        {
            expiresIn: '2h'
        }
    );
}
