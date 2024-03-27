const jwt = require('jsonwebtoken')
const db = require('../models')
const User = db.user

exports.decodedToken = async (req, res, next) => {
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            let token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, 'MYAPPSECRET')

            const userId = decoded.id;
            if (userId === undefined) {
                return res.status(401).json({ message: 'Invalid Token' })
            }
            const user = await User.findOne({
                where: { id: userId }
            })
            if (!user) {
                return res.status(401).json({ message: 'User not found' })
            }
            req.user = user.email
            console.log(`User: ${user.username} is signed in`)
        }
        else {
            return res.status(401).json({ message: 'Token not provided' })
        }
    }
    catch (error) {
        console.log(error.message)
        return res.status(401).json({ message: error.message })
    }

    next()
}


exports.logger = (req, res, next) => {
    const time = new Date()
    console.log(`Request Recieved at ${time}`)

    next()

}


exports.signIn = (req, res, next) => {
    const user = req.headers.user

    if (user !== 'root') {

        return res.status(401).json({ message: "You must be signed In to access this route" })

    }

    next()
} 