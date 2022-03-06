const express = require('express');
const router = express.Router();
const likesCtrl = require('../controllers/likes.controller.js');
const auth = require('../middleware/auth')


router.post('/vote/:postId', auth, likesCtrl.handleLikes)


module.exports = router