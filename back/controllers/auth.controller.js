const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');



exports.register = async (req, res) => {
    const { name, email, password } = req.body
    hash = bcrypt.hashSync(password, 10)
    try {
        await User.create({ name, email, password: hash })
        return res.status(201).json({ msg: 'utilisateur crée' })
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

exports.login = async (req, res, next) => {
    const email = req.body.email
    const user = await User.findOne({ where: { email } })
    if (!user) {
        return res.status(401).send('Utilisateur non trouvé !')
    }
    bcrypt.compare(req.body.password, user.password)

        .then(valid => {
            if (!valid) {
                return res.status(401).send('mot de passe incorrect');
            }
            const accessToken = jwt.sign({ userUuid: user.uuid, role: user.role }, `${process.env.PRIVATE_TOKEN_STRING}`, { expiresIn: "24h" })
            res.status(200).json({
                userUuid: user.uuid,
                accessToken
            });
        })
        .catch(error => res.status(500).json({ error: error.message }))
};
