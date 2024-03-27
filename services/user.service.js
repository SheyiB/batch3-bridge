const db = require('../models')
const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')
const { AppError } = require('../utils/error')
const User = db.user
class UserService {
    async createUser(userInfo) {
        try {
            const [user, created] = await User.findOrCreate({
                where: { [Op.or]: [{ email: userInfo.email }, { username: userInfo.username }] },
                defaults: userInfo,
            });

            if (!created) {
                throw new AppError('Email or Username already exists', 400);
            }

            return user
        }
        catch (error) {
            throw error
        }
    }

    async login(body) {
        try {
            const { email, password } = body
            let user = await User.findOne({
                where: { email: email }
            })

            if (!user) {
                throw new AppError('User not found', 404)
            }

            if (user.password !== password) {
                throw new AppError('Incorrect Password', 400)
            }

            const token = jwt.sign({ id: user.id }, 'MYAPPSECRET', { expiresIn: '1d' })

            return token
        }
        catch (error) {
            throw error
        }
    }

    async getAllUsers() {
        try {
            console.log(`Request Recieved`)
            const users = await User.findAll()

            return users
        } catch (error) {
            throw error
        }
    }

    async getUserByMail(email, signedInUserMail) {
        try {
            if (email !== signedInUserMail) {
                throw new AppError('Unauthorized to Access this Info', 401)
            }
            const user = await User.findOne({
                where: { email: email }
            })

            if (!user) {
                throw new AppError('User not found', 404)
            }

            return user

        } catch (error) {
            throw error
        }
    }

    async updateUser(data, userId) {
        try {

            let user = await db.user.findAll({
                where: { id: userId }
            })

            if (!user) {
                throw new AppError('User not found', 404)
            }

            const dataExistsInDB = await db.user.findOne({
                where: {
                    [Op.or]: [
                        { email: data.email },
                        { username: data.username }
                    ]
                }
            })

            if (dataExistsInDB) {
                throw new AppError('Email or Username already Exists', 400)
            }

            user = await db.user.update(data, {
                where: { id: userId }
            })

            return 'User Updated Successfully'
        }
        catch (error) {
            throw error
        }
    }

    async deleteUser(userId) {
        try {

            let user = await db.user.findOne({
                where: { id: userId }
            })

            if (!user) {
                throw new AppError('User not found', 404)
            }

            await db.user.destroy({
                where: { id: userId }
            })

            return 'User Deleted Successfully'
        }
        catch (error) {
            throw error
        }
    }
}

module.exports = UserService;