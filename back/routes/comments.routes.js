const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments.controller.js');



router.post('/', commentsCtrl.createComment)
router.get('/post/:uuid', commentsCtrl.getCommentsByPost)
router.get('/:uuid', commentsCtrl.getOneComment)
router.put('/:uuid', commentsCtrl.modifyComment)
router.delete('/:uuid', commentsCtrl.deleteComment)


module.exports = router