module.exports = (err, req, res, next) => {
    if (err.name == 'SequelizeValidationError'){
        const errors = err.errors.map(el => ({
            msg: el.message
        }))
        return res.status(400).json({
            name: `BadRequest`,
            errors
        })
    }
    else if(err.name == `JsonWebTokenError`) {
        return res.status(401).json({
            name: `Unauthorized`,
            errors: [{
                message: `Unauthorized. Please login first`
            }]
        })
    }
    else if (err.name == `BadRequest`){
        return res.status(400).json({
            name: `BadRequest`,
            errors: err.errors
        })
    }
    else if (err.name == `SequelizeUniqueConstraintError`){
        return res.status(400).json({
            name: `BadRequest`,
            errors: [{
                message: err.message
            }]
        })
    }
    else if (err.name == `NotFound`){
        return res.status(404).json({
            name: `NotFound`,
            errors: [{
                message: err.message
            }]
        })
    }
    else if (err.name == `Unauthorized`){
        return res.status(401).json({
            name: `Unauthorized`,
            errors: [{
                message: err.message
            }]
        })
    }
    else {
        return req.status(500).json({
            name: `InternalServerError`,
            errors: [{
                msg: err
            }]
        })
    }
}