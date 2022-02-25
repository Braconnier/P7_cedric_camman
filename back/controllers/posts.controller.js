const { Post } = require('../models')



exports.createPost = async (req, res, next) => {
    const postObject = req.body;
    console.log(postObject)

    if (req.file) {
        postObject.imageUrl = `${req.protocol}://${req.get('host')}/files/${req.file.filename}`
        console.log(postObject.imageUrl)
    }

    try {
        console.log(postObject)
        const post = await Post.create({ body: postObject.body, imageUrl: postObject.imageUrl, userId: postObject.userUuid })
        res.status(201).json({ post })
    } catch (err) {
        console.log(err)
        res.status(500).json({ err })
    }
};

exports.getOne = async (req, res) => {
    const id = req.params.id
    try {
        const post = await Post.findOne({
            where: { id },
            include: 'user'
        })
        return res.json(post)
    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.getAll = async (req, res) => {
    try {
        const posts = await Post.findAll()
        return res.status(200).json(posts)
    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.updatePost = async (req, res) => {
    const postObject = req.file
        ? {
            ...JSON.parse(req.body.post),
            imageUrl: `${req.protocol}://${req.get('host')}/files/${req.file.filename}`
        }
        : { ...req.body }

    try {
        const post = await Post.findOne({ where: { id: req.params.id } })
        post.body = postObject
        await post.save()
        return res.status(200).json({ msg: 'commentaire modifié' })

    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.deletePost = async (req, res) => {
    const id = req.params.id
    try {
        const post = await Post.findOne({ where: { id } })
        await post.destroy()
        return res.json({ msg: 'post supprimé' })
    } catch (err) {
        return res.status(500).json(err)
    }
}