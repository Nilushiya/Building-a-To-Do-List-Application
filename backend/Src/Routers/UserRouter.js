const express = require('express')
const router = express.Router()
const userController = require('../Contoller/UserController')
// const { verifyToken, checkRole } = require('../Middlewares/authmiddleware');

router.post('/signup',userController.signup)
router.post('/signin',userController.signin)

module.exports = router;