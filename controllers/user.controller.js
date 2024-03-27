
const UserService = require('../services/user.service')
const { errorHandler } = require('../utils/error')
const { createUserValidator, updateUserValidator } = require('../validators/user.validator')


const User = new UserService()

exports.signup = async (req, res) => {
    try {

        const { error } = createUserValidator(req.body)
        //console.log(error)
        if (error) {
            return res.status(400).json({ message: error.details[0].message })
        }
        const user = await User.createUser(req.body)

        res.status(201).json({
            status: 'success',
            message: 'User created successfully',
            user
        })


    } catch (error) {
        errorHandler(error, res)
    }
}


exports.getAllUser = async (req, res) => {
    try {
        console.log(req.user)
        const users = await User.getAllUsers()
        res.status(200).json({ users })
    } catch (error) {
        errorHandler(error, res)
    }
}

exports.getUserByMail = async (req, res) => {
    try {

        const userEmail = req.params.mail

        const user = await User.getUserByMail(userEmail, req.user)

        if (user.code) {
            return res.status(401).json({ message: user.message })
        }
        res.status(200).json({ user })
    }
    catch (error) {
        errorHandler(error, res)
    }
}


exports.updateUser = async (req, res) => {
    try {

        const { error } = updateUserValidator(req.body)

        if (error) {
            return res.status(400).json({ message: error.details[0].message })
        }

        const data = req.body;
        const userId = req.body.id;

        const user = await User.updateUser(data, userId)

        res.status(200).json({ user })
    }
    catch (error) {
        errorHandler(error, res)
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.body.userId;

        await User.deleteUser(userId)

        res.status(200).json({ message: "User Deleted Successfully" })
    }
    catch (error) {
        errorHandler(error, res)
    }
}


exports.login = async (req, res) => {
    try {

        const response = await User.login(req.body)

        res.status(200).json({ response })
    }
    catch (error) {
        errorHandler(error, res)
    }
}

