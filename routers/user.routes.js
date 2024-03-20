const express = require('express')

const router = express.Router()


const { deleteUser, getAllUser, getUserByMail, signup, updateUser } = require('../controllers/user.controller')


router.post('/signup', signup)

router.get('/all-users', getAllUser)

router.get('/user/:mail', getUserByMail)

router.put('/user', updateUser)

router.delete('/user', deleteUser)


module.exports = router;