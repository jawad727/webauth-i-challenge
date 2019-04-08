const express = require('express')
const helmet = require('helmet')

const authRouter = require('./routers/authentication-router.js')

const server = express();


server.use(helmet())
server.use(express.json())


server.get('/', (req, res) => {
    res.send(
        `<h1>working</h1>`
    )
 })
 
 //Routes
 server.use('/api', authRouter)
 
 
 module.exports = server;
 
 