const { Comment } = require('../models');


exports.getCommentsByPost = async (req, res) => {
    postId = req.params.id
    try {

        await Comment.findAll({ where: { postId }, order: [['updatedAt', 'DESC']] })
            .then((data) => {
                (data === null)
                    ? res.status(200).json({ msg: 'ce post n\'à pas de commentaire' })
                    : res.status(200).json(data)
            })
            .catch(err => res.status(400).json(err))

    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.createComment = async (req, res) => {
    const { postId, userId, body } = req.body.data
    try {
        const comment = await Comment.create({ body, userId, postId })
        return res.json(comment)
    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.getOneComment = async (req, res) => {
    const id = req.params.id
    try {
        await Comment.findOne({ where: { id }, include: 'user' })
            .then((data) => res.json(data))
            .catch(err => res.status(404).json(err))

    } catch (err) {
        return res.status(500).json(err)
    }
}
exports.modifyComment = async (req, res) => {
    try {
        const comment = await Comment.findOne({ where: { id: req.params.id } })
        await Comment.update({ body: req.body.data.body }, { where: { id: comment.id } })
        return res.status(200).json({ comment })

    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.deleteComment = async (req, res) => {
    const id = req.params.id
    try {
        const comment = await Comment.findOne({ where: { id } })
        await comment.destroy()
        return res.json({ msg: 'commentaire supprimé' })
    } catch (err) {
        return res.status(500).json(err)
    }
}