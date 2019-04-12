const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session) //if you name line 3 somthing else pass it in
const DB = require('./data/dbConfig')

const authRouter = require('./routers/authentication-router.js')


const server = express();

const sessionConfig = {
    name: 'cookie',
    secret: 'secret word',
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60
    },
    resave: false,
    saveUninitialized: false,
    store: new KnexSessionStore({
        knex: DB,
        tablename: 'sessions',
        sidfieldname: 'sid',
        createtable: true,
        clearInterval: 1000 * 60 * 30
    })
    

}


server.use(helmet())
server.use(express.json())
server.use(session(sessionConfig))



server.get('/', (req, res) => {
    res.send(
        `<h1>working</h1>`
    )
 })
 
 //Routes
 server.use('/api', authRouter)
 
 
 module.exports = server;
 
 