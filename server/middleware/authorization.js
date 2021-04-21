const {Post} = require('../models')

function authorization(req,res,next) {
    let id = req.params.id
    
    Post.findByPk(id)
    .then(data =>{
        console.log(data, req.id)
        if (!data) throw {msg : "Post not found!", code : 404}
        else if (data.id != req.id) throw {msg : "you're not authorized!", code : 401}
        else next()
    })
    .catch(err => {
        next(err)
    })
}

module.exports = {authorization}