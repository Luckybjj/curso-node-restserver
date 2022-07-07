

const { Schema, model } = require('mongoose')

const RolSchema = Schema({
    rol: {
        type: String,
        required: [true, 'El rol es Obligatorio']
    }
});

module.exports = model('Role', RolSchema);