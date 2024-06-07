const task = require('../Model/Task')

exports.add_task = (req , res) =>{
    const id = req.params.id;
    task.create_task(req.body,id)
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