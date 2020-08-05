const { User } = require('../models')

const authorization = (req, res, next) => {
    let id = req.UserId

    User.findByPk(id)
        .then(result => {
            console.log(result, 'ini data authorization')
            if(result) {
                if(result.role === "admin") {
                    next()
                }else {
                    return next({
                        message: "You cannot access this service",
                        code: 401
                    })
                }
            } else {
                return next({
                    message: "Product not Found",
                    code: 404
                })
            }
        })
        .catch(err => {
            return next(err)
        })
}

module.exports = authorization;