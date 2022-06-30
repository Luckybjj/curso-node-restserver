const { response } = require('express')

const usersGet = (req, res = response) => { 
    const { saludo, nombre = 'No name', key, page = 1, limit } = req.query;   
    res.json({
        msg: 'get API - Controlador',
        saludo,
        nombre,
        key,
        page,
        limit, 
    });
}

const usersPut = (req, res = response) => { 
    const { id } = req.params;   
    res.json({
        msg: 'put API - Controlador',
        id,
    });
}

const usersPost =  (req, res ) => {    
    // const body = req.body;
    const { nombre, edad } = req.body;
    res.status(201).json({
        msg: 'post API - Controlador',
        nombre,
        edad,
    });
}

const usersDelete = (req, res) => {    // 
    res.json({
        msg: 'delete API - Controlador',
    });
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete,
}