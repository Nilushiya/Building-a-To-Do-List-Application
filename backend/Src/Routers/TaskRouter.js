const express = require('express')
const router = express.Router()
const taskController = require('../Contoller/TaskController')
const { verifyToken } = require('../Middlewares/authmiddleware');


router.post('/addtask',verifyToken,taskController.add_task);
router.get('/gettask',verifyToken,taskController.get_task);
router.delete('/deletetask/:task_id',taskController.delete_task);
router.put('/updatetask/:task_id', taskController.update_Task);
router.put('/updateStatus/:task_id', taskController.update_Status);

module.exports = router;