module.exports = (req, res, next) => {
try {


    if (req.session && req.session.user) {
        next()
    } else {
        res.status(401).json({ message: 'Invalid credentials '})
    }

        
} catch (error) {
    res.status(500).json({ message: 'You broke it' })
}
}
// restart

//restart 2