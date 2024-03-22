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