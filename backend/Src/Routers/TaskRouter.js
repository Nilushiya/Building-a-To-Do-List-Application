const express = require('express')
const router = express.Router()
const taskController = require('../Contoller/TaskController')
const { verifyToken } = require('../Middlewares/authmiddleware');


router.post('/addtask',verifyToken,taskController.add_task);
router.get('/gettask',verifyToken,taskController.get_task);

module.exports = router;