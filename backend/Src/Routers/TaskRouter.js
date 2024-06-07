const express = require('express')
const router = express.Router()
const taskController = require('../Contoller/TaskController')
const { verifyToken, checkRole } = require('../Middlewares/authmiddleware');


router.post('/addtask/:id',verifyToken,taskController.add_task)