const route = require('express').Router()
const Controller = require('../controller/post')


route.get('/', Controller.read)
route.post('/', Controller.add)
route.delete('/:id', Controller.delete)

module.exports = route