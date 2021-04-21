const route = require('express').Router()
const Controller = require('../controller/post')
const {custAuthentication} = require('../middleware/authentication')
// const {authorization} = require('../middleware/authorization')

route.use(custAuthentication)
route.get('/', Controller.read)
route.get('/:id', Controller.readId)
route.post('/', Controller.add)
route.put('/:id', Controller.edit)
route.delete('/:id', Controller.delete)

module.exports = route