const express = require('express')
const router = express.Router()

const config = require('../config')


const usersController = require('../controllers/usersController')

router.post('/users/register',usersController.register)

router.post('/users/login',usersController.login)

router.get('/users/user',usersController.user)

module.exports = router