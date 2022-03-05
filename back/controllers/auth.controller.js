const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');



exports.register = async (req, res) => {
    const { name, email, password } = req.body
    try {
        if (password.length < 6 || password.length > 12) throw ({
            errors: [{ message: 'invalid password length' }]
        })
        const regex = /^.*(?=.{8,12})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?@."]).*$/i
        if (!password.match(regex)) throw ({ errors: [{ message: 'password must meet the criterias' }] })
        hash = bcrypt.hashSync(password, 10)
        await User.create({ name, email, password: hash })
        return res.status(201).json({ msg: 'utilisateur crée' })
    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.login = async (req, res, next) => {
    const email = req.body.email
    const user = await User.findOne({ where: { email } })
    if (!user) {
        return res.status(500).json({ errors: [{ message: 'user not found' }] })
    }
    bcrypt.compare(req.body.password, user.password)

        .then(valid => {
            if (!valid) {
                return res.status(500).json({ errors: [{ message: 'invalid password' }] })
            }
            const accessToken = jwt.sign({ userUuid: user.uuid, role: user.role }, `${process.env.PRIVATE_TOKEN_STRING}`, { expiresIn: "24h" })
            res.status(200).json({
                userUuid: user.uuid,
                accessToken,
                role: user.role
            });
        })
        .catch(error => res.status(500).json({ error: error.message }))
};
