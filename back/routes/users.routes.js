const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller.js');
const authCtrl = require('../controllers/auth.controller');
const auth = require('../middleware/auth.js');
const multer = require('../middleware/multer-config')


router.post('/auth/register', authCtrl.register)
router.post('/auth/login', authCtrl.login)
router.get('/', userCtrl.getAll)
router.get('/:uuid', auth, userCtrl.getOne)
router.put('/:uuid', auth, multer, userCtrl.modifyUser)
router.delete('/:uuid', auth, userCtrl.deleteUser)

module.exports = router