const UserService = require('../services/user.service')


const User = new UserService()

exports.signup = async (req, res) => {
    try {
        const user = await User.createUser(req.body)
        res.status(201).json({
            status: 'success',
            message: 'User created successfully',
            user
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


exports.getAllUser = async (req, res) => {
    try {
        const users = await User.getAllUsers()
        res.status(200).json({ users })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getUserByMail = async (req, res) => {
    try {
        const userEmail = req.params.mail
        const user = await User.getUserByMail(userEmail)

        res.status(200).json({ user })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}


exports.updateUser = async (req, res) => {
    try {
        const data = req.body;
        const userId = req.body.id;

        const user = await User.updateUser(data, userId)

        res.status(200).json({ user })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.body.userId;

        await User.deleteUser(userId)

        res.status(200).json({ message: "User Deleted Successfully" })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}


exports.login = async (req, res) => {
    try {

        const response = await User.login(req.body)

        res.status(200).json({ response })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

