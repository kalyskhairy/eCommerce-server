const errorHandler = (err, req, res, next) => {

    switch (err) {
        case "JsonWebTokenError":
            return res.status(401).json({ message: "Login first" })
        case "SequelizeValidationErron": 
            return res.status(400).json({ message: err.message })
        default:
            console.log(err)
            return res.status(err.code || 500).json({ message: err.message })
    }
    // if (err.name == 'JsonWebTokenError') {
    //     res.status(401).json({ message: "Login first" })
    // } 
}

module.exports = errorHandler