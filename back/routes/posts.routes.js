const express = require('express');
const router = express.Router()
const auth = require('../middleware/auth')
const postCtrl = require('../controllers/posts.controller');
const multer = require('../middleware/multer-config')


router.post('/', auth, multer, postCtrl.createPost)
router.get('/', postCtrl.getAll)
router.put('/:id', auth, multer, postCtrl.updatePost)
router.delete('/:id', auth, postCtrl.deletePost)


module.exports = router