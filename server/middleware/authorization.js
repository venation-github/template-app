const {Product,Cart, Wishlist} = require('../models')

function authorization(req,res,next) {
    let id = req.params.id
    
    Product.findByPk(id)
    .then(data =>{
        if (!data) throw {msg : "Product not found!", code : 404}
        else next()
    })
    .catch(err => {
        next(err)
    })
}

function cartAuthorization(req,res,next) {
    let id = req.params.id
    
    Cart.findByPk(id)
    .then(data =>{
        if (!data) throw {msg : "Cart not found!", code : 404}
        if (data.UserId !== req.userData) throw {msg : "Unauthorized Account!", code : 401}
        else next()
    })
    .catch(err => {
        next(err)
    })
}

function wishlistAuthorization(req,res,next) {
    let id = req.params.id
    
    Wishlist.findByPk(id)
    .then(data =>{
        if (!data) throw {msg : "Wishlist not found!", code : 404}
        if (data.UserId !== req.userData) throw {msg : "Unauthorized Account!", code : 401}
        else next()
    })
    .catch(err => {
        next(err)
    })
}

module.exports = {authorization, cartAuthorization, wishlistAuthorization}