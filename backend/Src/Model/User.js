const db = require('../Config/Dbconfig');
const bcrypt = require('bcrypt');

const User = function(user) {
    this.user_name = user.user_name;
    this.user_type = user.user_type || 'USER';
    this.email = user.email;
    this.password = user.password;
  };

  User.user_signup = function(user){

    return new Promise(async (resolve, reject) => {
            console.log(user)

            const saltRounds = 10;
            try{
                const hashPassword = await bcrypt.hash(user.password, saltRounds)
                user.password = hashPassword
    
                const sql = `insert into user (user_name, email, password) values (?, ?, ?)`
                console.log("sql"+sql)
                db.execute(sql, [user.user_name, user.email, user.password],
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
            catch(error){
                reject(error)
            }
            })
               
}

User.user_signin = function(signinRes){
    return new Promise((resolve, reject) => {
        const sql = `select * from user where email = ?`
        db.execute(sql, [signinRes.email], 
            (err, res) => {
                if(err){
                    reject(err)
                }
                else{
                    resolve(res)
                }
            }
        )
    })
}
module.exports = User;