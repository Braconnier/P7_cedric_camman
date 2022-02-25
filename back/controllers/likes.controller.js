const { User, Post, Likes } = require('../models');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken')
const privateKey = process.env.PRIVATE_TOKEN_STRING;


exports.getLikes = async (req, res) => {
    const postId = req.params.postId
    try {
        const posts = await Likes.findAll({ where: { postId } })
        res.status(200).json(posts)
    } catch (err) {
        console.log(err)
    }
}


exports.handleLikes = async (req, res) => {
    const postId = req.params.postId
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, privateKey);
        const userUuid = decodedToken.userUuid;
        const user = await User.findOne({ where: { uuid: userUuid } })
        const post = await Post.findOne({ where: { id: postId } })
        const like = await Likes.findOne({ where: { [Op.and]: [{ userId: user.uuid }, { postId }] } })
        console.log(like)
        if (like === null) {
            await Likes.create({ userId: user.uuid, postId: postId })
            await Post.update({ likes: post.likes + 1 }, { where: { id: postId } })
            return res.json(like)
        } else {
            await Likes.destroy({ where: { id: like.id } })
            await Post.update({ likes: post.likes - 1 }, { where: { id: postId } })
            return res.json(like)
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}



