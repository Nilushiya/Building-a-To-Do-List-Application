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
    console.log("res",res)
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