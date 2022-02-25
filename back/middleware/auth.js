const jwt = require('jsonwebtoken');
const { User } = require('../models')
const dotenv = require('dotenv');
dotenv.config();
const privateKey = process.env.PRIVATE_TOKEN_STRING;

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, privateKey);
        const userUuid = decodedToken.userUuid;
        if (req.body.userUuidd && req.body.userUuid !== userUuid) {
            throw 'Id utilisateur non valide';
        } else {
            User.findOne({ where: { uuid: userUuid } })
                .then(user => {
                    if (userUuid !== user.uuid) {
                        throw 'utilisateur non valide'
                    } else {
                        next()
                    }
                })
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Reqête non authentifiée' })
    }
}