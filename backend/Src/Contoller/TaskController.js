const task = require('../Model/Task')

exports.add_task = (req , res) =>{
    // const id = req.params.id;
    task.create_task(req.body,req.user.id)
    
    .then(response => {
        return res.status(201).json(response)
    })
    .catch(err => {
        return res.staatus(500).json({
            error:'Create faild. Please try again later.',
            details:err.message
        })
    })
}

exports.get_task = (req,res) =>{
    // console.log("res",res)
    task.get_task_by_id(req.user.id)
    .then(response => {
        return res.status(201).json(response)
    })
    .catch(err => {
        return res.status(500).json({
            error:'get faild. Please try again leter.',
            details:err.message
        })
    })
}

exports.delete_task = (req,res) =>{
    // console.log("res",res)
    const task_id = req.params.task_id;
    task.delete_task(task_id)
    .then(response => {
        return res.status(201).json(response)
    })
    .catch(err => {
        return res.status(500).json({
            error:'delete faild. Please try again leter.',
            details:err.message
        })
    })
}


exports.update_Task = (req,res) =>{
    // console.log("res",res)
    const task_id = req.params.task_id;
    const updatedTask = req.body;
    task.update_task(updatedTask , task_id)
    .then(response => {
        return res.status(201).json(response)
    })
    .catch(err => {
        return res.status(500).json({
            error:'update faild. Please try again leter.',
            details:err.message
        })
    })
}

exports.update_Status = (req,res) =>{
    // console.log("res",res)
    const task_id = req.params.task_id;
    const updatedStatus = req.body;
    task.update_status(updatedStatus , task_id)
    .then(response => {
        return res.status(201).json(response)
    })
    .catch(err => {
        return res.status(500).json({
            error:'update status faild. Please try again leter.',
            details:err.message
        })
    })
}