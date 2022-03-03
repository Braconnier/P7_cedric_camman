const { Post, Comments } = require('../models')
const fs = require('fs');



exports.createPost = async (req, res, next) => {
    const postObject = req.body;
    if (req.file) {
        postObject.imageUrl = `/files/${req.file.filename}`
    }
    try {
        const post = await Post.create({ body: postObject.body, imageUrl: postObject.imageUrl, userId: postObject.userId })
        res.status(201).json({ post })
    } catch (err) {
        res.status(500).json({ err })
    }
};

// exports.getOne = async (req, res) => {
//     const id = req.params.id
//     try {
//         const post = await Post.findOne({ where: { id } })
//         return res.json(post)
//     } catch (err) {
//         return res.status(500).json(err)
//     }
// }

exports.getAll = async (req, res) => {
    try {
        const posts = await Post.findAll({ order: [['createdAt', 'DESC']], include: ['Comments', 'Likes'] })
        return res.status(200).json(posts)
    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.updatePost = async (req, res) => {
    const postObject = req.body.data
    try {
        const post = await Post.findOne({ where: { id: req.params.id } })
        await Post.update({ body: postObject.body }, { where: { id: post.id } })
        return res.status(200).json({ post })
    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.deletePost = async (req, res) => {
    const id = req.params.id
    try {
        const post = await Post.findOne({ where: { id } })
        const fileToDelete = post.imageUrl.split('/files/')[1]
        fs.unlink(`files/${fileToDelete}`, () => {
            console.log('image supprimée')
        })
        await post.destroy()
        return res.json({ msg: 'post supprimé' })
    } catch (err) {
        return res.status(500).json(err)
    }
}