const express = require('express')

const router = express.Router()

const { logger, signIn, decodedToken } = require('../middlewares/middleware')
const { deleteUser, getAllUser, getUserByMail, signup, updateUser, login } = require('../controllers/user.controller')


router.post('/signup', signup)
router.get('/all-users', logger, signIn, decodedToken, getAllUser)
router.get('/user/:mail', getUserByMail)
router.put('/user', updateUser)
router.delete('/user', deleteUser)

router.post('/login', login)


module.exports = router;