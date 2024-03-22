const express = require('express')

const router = express.Router()

const { logger, signIn } = require('../middlewares/middleware')
const { deleteUser, getAllUser, getUserByMail, signup, updateUser } = require('../controllers/user.controller')


router.post('/signup', signup)

router.get('/all-users', logger, signIn, getAllUser)

router.get('/user/:mail', getUserByMail)

router.put('/user', updateUser)

router.delete('/user', deleteUser)


module.exports = router;