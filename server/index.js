require('dotenv').config()
const cors = require('cors')
const express = require('express')
// const formidableMiddleware = require('express-formidable');
const app = express()
const user = require('./route/user')
const post = require('./route/post')
const err = require('./middleware/err')
const port = 3000

app.use(cors())
app.use(express.urlencoded({ extended:true}))
// app.use(formidableMiddleware());
app.use(express.json())
app.use(express.static(`${__dirname}/middleware`))

app.use('/', user)
app.use('/post', post)
app.use(err)
app.listen(port, ()=> console.log(`jalan di port ${port}`))


module.exports = app