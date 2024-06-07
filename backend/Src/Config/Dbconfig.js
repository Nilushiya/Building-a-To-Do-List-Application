const mysql = require('mysql2')

var connection = mysql.createPool({
    host:'localhost',
    port:'3307',
    user: 'root',
    password: 'Nilushiya00#',
    database: 'todo_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

connection.getConnection(function(err){
    if(err) throw err;
    console.log('conected')
}) 

module.exports = connection