const jwt = require('jsonwebtoken')

function generateToken(param) {
    return jwt.sign(param,"BAGASGANTENG")
}

function verifyToken(param) {
    return jwt.verify(param, "BAGASGANTENG")
}

module.exports = {generateToken, verifyToken}

