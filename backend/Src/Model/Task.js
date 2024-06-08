const { resolve } = require('path');
const db = require('../Config/Dbconfig');

const Task = function(task) {
    this.user_id = task.user_id;
    this.title = task.title;
    this.description = task.description;
    this.status = task.status || 'not_completed';
};

Task.create_task = function(task , id){
    return new Promise(async(resolve , reject) => {
        try{
            const sql = `insert into task (user_id, title, description) values (?, ?, ?)`
            db.execute(sql, [id, task.title, task.description],
                                    (err, res) => {
                                        if(err){
                                            reject(err)
                                        }
                                        else{
                                            resolve(res)
                                        }
                                    }
            )
        }
        catch(err){
            reject(err)
        }
    })
}


Task.get_task_by_id = function(id){
    console.log("id:",id);
    return new Promise(async(resolve , reject) => {
        try{
            const sql = `select * from task where user_id = ?`
            console.log("sql"+sql)
            db.execute(sql, [id],(err, res) => {
                                        if(err){
                                            reject(err)
                                        }
                                        else{
                                            resolve(res)
                                        }
                                    }
            )
        }
        catch(err){
            reject(err)
        }
    })
}

Task.delete_task = function(task_id){
    console.log("task_id:",task_id);
    return new Promise(async(resolve , reject) => {
        try{
            const sql = `delete from task where task_id = ?`
            console.log("sql"+sql)
            db.execute(sql, [task_id],(err, res) => {
                                        if(err){
                                            reject(err)
                                        }
                                        else{
                                            resolve(res)
                                        }
                                    }
            )
        }
        catch(err){
            reject(err)
        }
    })
}

Task.update_task = function(updatedTask ,task_id ){
    console.log("update task_id:",task_id);
    return new Promise((resolve, reject) => {
        let sql = 'update task set ';
        const params = [];
        if (updatedTask.title) {
            sql += 'title = ?, ';
            params.push(updatedTask.title);
        }
        if (updatedTask.description) {
            sql += 'description = ?, ';
            params.push(updatedTask.description);
        }

        sql = sql.slice(0, -2);

        sql += ' WHERE task_id = ?';
        params.push(task_id);

        db.execute(sql, params, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });

    
    return new Promise(async(resolve , reject) => {
        try{
            const sql = 'update task set title = ?, description = ? WHERE task_id = ?';
            db.execute(sql, [updatedTask.title, updatedTask.description, task_id], (err, res) => {
                                        if(err){
                                            reject(err)
                                        }
                                        else{
                                            resolve(res)
                                        }
                                    }
            )
        }
        catch(err){
            reject(err)
        }
    })
}

Task.update_status =function(updatedStatus , task_id){
return new Promise(async(resolve , reject) => {
    try{
        const sql = 'update task set status = ? WHERE task_id = ?';
        db.execute(sql, [updatedStatus.status, task_id], (err, res) => {
                                    if(err){
                                        reject(err)
                                    }
                                    else{
                                        resolve(res)
                                    }
                                }
        )
    }
    catch(err){
        reject(err)
    }
})
}


module.exports = Task;