const route = require('express').Router()
const Controller = require('../controller/user')


route.post('/login', Controller.login)
route.post('/register', Controller.register)


module.exports = route