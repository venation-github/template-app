const {User} = require('../models')
const {verifyToken} = require('../helper/jwt')

async function authentication(req,res,next) {
    try {
        let {token} = req.headers
        let decoded = verifyToken(token)
        
        let user = User.findOne({
            where : {
                email : decoded.email
            }
        })
        if (!user) throw {msg : "authentication failed", code : 401}
        if (decoded.role != 'admin') throw {msg : "you're not admin!", code : 401}
        req.userData = decoded.id
        next()
    } catch (err) {
        next(err)   
    }
}

async function custAuthentication(req,res,next) {
    try {
        let {token} = req.headers
        let decoded = verifyToken(token)
        
        let user = User.findOne({
            where : {
                email : decoded.email
            }
        })
        if (!user) throw {msg : "authentication failed", code : 401}
        req.id = decoded.id
        next()
    } catch (err) {
        next(err)   
    }
}


module.exports = {authentication, custAuthentication}