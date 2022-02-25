// imports
const { User } = require('../models')
const fs = require('fs');



exports.getAll = async (req, res) => {
    try {
        const users = await User.findAll()
        return res.json(users)
    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.getOne = async (req, res) => {
    const uuid = req.params.uuid
    try {
        const user = await User.findOne({
            where: { uuid }
        })
        return res.json(user)
    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.modifyUser = async (req, res) => {
    try {
        const uuid = req.params.uuid
        if (req.file) {
            const user = await User.findOne({ where: { uuid } })
            const oldFilename = user.profileImgUrl

            if (oldFilename !== '/files/default-profile.png') {
                fileToDelete = oldFilename.split('/files/')[1]
                fs.unlink(`files/${fileToDelete}`, () => {
                    console.log('image supprimée')
                })
            }
            await User.update({ profileImgUrl: `/files/${req.file.filename}` }, { where: { uuid } })


        }
        if (req.body.bio) {
            await User.update({ bio: req.body.bio }, { where: { uuid } })
        }
        return res.status(200).json({ msg: 'image modifiée' })
    } catch (error) {
        res.status(400).json({ error })
    }
}

exports.deleteUser = async (req, res) => {
    const uuid = req.params.uuid
    try {
        const user = await User.findOne({ where: { uuid } })
        await user.set({ active: 0 })
        user.save()
        return res.json(user)
    } catch (err) {
        return res.status(500).json(err)
    }
}