const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { verifyToken, checkRole } = require('./Src/Middlewares/authmiddleware')
const path = require('path');
// const db = require('./Src/Config/Dbconfig');

const Server = express()

Server.use(cors())
Server.use(express.json())
Server.use(bodyParser.json())

const userRouter = require('./Src/Routers/UserRouter')

// db.getConnection((err, connection) => {
//     if (err) {
//         console.error('Error connecting to the database:', err.stack);
//     } else {
//         console.log('Connected to the database as id ' + connection.threadId);
//         connection.release();
//     }
// });
Server.use('/api/user', userRouter)


module.exports = Server

const PORT = process.env.PORT || 4000
Server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})