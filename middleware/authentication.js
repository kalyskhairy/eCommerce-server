const { verifyToken } = require('../helpers/jwt.js')
const { User } = require('../models')

const authentication = (req, res, next) => {
    let token = req.headers.token
    if(!token) {
        return next({
            code: 400,
            message: "Please login First!"
        })
    } else {
        try {
            let decoded = verifyToken(token)
            let {id} = decoded

            User.findByPk(id)
                .then(data => {
                    // console.log(data,'ini data dari authentication')
                    if (data) {
                        req.UserId = id
                        next()
                    } else {
                        throw {
                            message: "Authenticated Error",
                            code: 401
                        }
                    }
                })
                .catch(err => {
                    return next(err)
                })
        } catch (error) {
            return next(error)
        }
    }
}

module.exports = authentication;