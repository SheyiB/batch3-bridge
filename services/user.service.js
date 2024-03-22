const db = require('../models')

const jwt = require('jsonwebtoken')

const User = db.user

class UserService {

    async createUser(userInfo) {
        try {
            const user = await User.create(userInfo)

            return user
        }
        catch (error) {
            return error
        }
    }

    async login(body) {

        try {
            const { email, password } = body
            let user = await User.findOne({
                where: { email: email }
            })

            if (!user) {
                return 'User not found'
            }

            if (user.password !== password) {
                return 'Invalid Password'
            }

            const token = jwt.sign({ id: user.id }, 'MYAPPSECRET', { expiresIn: '1d' })

            return token
        }
        catch (error) {
            return error
        }
    }

    async getAllUsers() {
        try {
            console.log(`Request Recieved`)
            const users = await User.findAll()

            return users
        } catch (error) {
            return error
        }
    }

    async getUserByMail(email) {
        try {
            const user = await User.findOne({
                where: { email: email }
            })

            return user

        } catch (error) {
            return error
        }
    }

    async updateUser(data, userId) {
        try {

            const user = await db.user.update(data, {
                where: { id: userId }
            })

            return 'User Updated Successfully'
        }
        catch (error) {
            return error
        }
    }

    async deleteUser(userId) {
        try {

            await db.user.destroy({
                where: { id: userId }
            })

            return 'User Deleted Successfully'
        }
        catch (error) {
            return error
        }
    }
}

module.exports = UserService;