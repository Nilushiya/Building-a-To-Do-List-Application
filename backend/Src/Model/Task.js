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
            console.log("sql"+sql)
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
module.exports = Task;