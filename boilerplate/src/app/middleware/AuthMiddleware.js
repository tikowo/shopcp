const jwt = require("jsonwebtoken");
const { jwtSecret } = require('../../config/vars');

const User = require('../models/User');

const verifyToken = async (req, res, next) => {
    const token = req.query.token || req.headers['x-access-token'];

    try {
        const { id } = jwt.verify(token, jwtSecret);
        req.auth = await User.query().where('id', id).throwIfNotFound();
    } catch(e) {
        return res.status(401).json({
            error: 'Unauthenticated'
        });
    }

    return next();
};

module.exports = verifyToken;
