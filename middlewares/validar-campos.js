const { validationResult } = require('express-validator');

const validaCampos = (req, res, next) => {      // los middlewares pueden tener un tercer argumento next()
                                                // si llega a ese punto seguirá con el siguiente middleware (si no hay mas s ejucta el cotrolador)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next();
}


module.exports = {
    validaCampos,
}