const { User, Post, Comment } = require('../models');


exports.getCommentsByPost = async (req, res) => {
    const postId = req.params.postId
    try {
        await Comment.findAll({ where: { postId } })
            .then((data) => res.json(data))
            .catch(err => res.status(404).json(err))

    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.createComment = async (req, res) => {
    const { postId, userUuid, body } = req.body
    try {
        const post = await Post.findOne({ where: { postId } })
        const user = await User.findOne({ where: { uuid: userUuid } })
        const comment = await Comment.create({ body, userId: user.id, postId: post.id })
        return res.json(comment)
    } catch (err) {
        console.log(err)
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
    const id = req.params.id
    const { body } = req.body
    try {
        const comment = await Comment.findOne({ where: { id } })
        comment.body = body
        comment.likes = likes
        comment.dislikes = dislikes
        await comment.save()
        return res.status(200).json({ msg: 'commentaire modifié' })

    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.deleteComment = async (req, res) => {
    const id = req.params.id
    try {
        const comment = await comment.findOne({ where: { uuid } })
        await comment.destroy()
        return res.json({ msg: 'commentaire supprimé' })
    } catch (err) {
        return res.status(500).json(err)
    }
}