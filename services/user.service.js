const db = require('../models')

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

    async getAllUsers() {
        try {
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