
const router = require('express').Router();

const authDB = require('../helper/authentication-helper.js')

const bcrypt = require('bcryptjs')

router.get('/users', role('true') ,(req,res) => {
    authDB
       .getUser()
       .then(user => {
           res.status(200).json(user)
       })
       .catch(error => {
           res.status(400).json({
               error: "couldnt get user"
           })
       })
})


router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 4)
    user.password = hash;

    authDB
    .add(user)
    .then(saved => {
        res.status(201).json(saved)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})


router.post('/login', (req, res) => {
    let {username, password} = req.body;

    authDB
    .getBy({username})
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
            res.status(200).json({ message: `Welcome ${user.username}` })
        } else {
            res.status(401).json({ message: 'YOU SHALL NOT PASS' })
        }
    })
    .catch( error => {
        res.status(500).json(error)
    })
})

// function authenticate(req, res, next) {
//     const {username, password} = req.headers;
   
//     if(username && password) {
//       Users.findBy({username})
//       .first()
//       .then(user => {
//         if (user && bcrypt.compareSync(password, user.password)) {
//           next()
//         } else {
//           res.status(401).json({message: 'Invalid Credentials'})
//         }
//       }).catch(error => {
//         res.status(500).json({message: 'Something went wrong on our end.',
//       error: error})
//       })
//     } else {
//       res.status(400).json({message: 'No credentials provided.'})
//     }
//    }


function role(loggedin) {
    return function(req, res, next) {
      if(req.headers.loggedin === loggedin) {
        next()
      } else {
        res.status(403).json({message: 'YOU SHALL NOT PASS.'})
      }
    }
   }


module.exports = router;
