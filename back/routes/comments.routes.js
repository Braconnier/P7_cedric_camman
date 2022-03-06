const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments.controller.js');
const auth = require('../middleware/auth')



router.post('/', auth, commentsCtrl.createComment)
router.put('/:id', auth, commentsCtrl.modifyComment)
router.delete('/:id', auth, commentsCtrl.deleteComment)


module.exports = router