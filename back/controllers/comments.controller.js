const { Comment } = require('../models');



exports.createComment = async (req, res) => {
    const { postId, userId, body } = req.body.data
    try {
        const comment = await Comment.create({ body, userId, postId })
        return res.json(comment)
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