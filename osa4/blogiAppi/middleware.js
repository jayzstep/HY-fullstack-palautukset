const jwt = require('jsonwebtoken')
const User = require('./models/user')

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        request.token = authorization.replace('Bearer ', '')
    } else {
        request.token = null
    }
    
    next()
}

const userExtractor = async (request, response, next) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        next(error)
    }
    request.user = await User.findById(decodedToken.id)
    next()
}


module.exports = {
    tokenExtractor,
    userExtractor
}