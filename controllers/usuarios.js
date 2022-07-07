const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');   // se utiliza mayuscula porque esto nos permite crear instancias de mi modelo


const usersGet = async (req, res = response) => {
    // Get de todos los usuarios
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    // Promise.all ejecuta las promesas de manera simultanea, si una da error todas darán error
    const [ total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])
    res.json({
        total,
        usuarios,
    });
}

const usersPost = async (req, res) => {

    //const body = req.body;
    const { nombre, correo, password, rol } = req.body;
    // Crear intsancia de nuestro modelo
    // todos los argumentos que recibamos en el body se los mandaremos a nuestro modelo de usuario
    // la ventaja es que solo enviará los campos definidos en el modelo.
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Guardar en BD
    await usuario.save()    // grabar el registro

    res.status(201).json({
        usuario,
    });
}

const usersPut = async (req, res = response) => {
    const { id } = req.params;
    // Acá se excluyen todos los datos que no deseo actualizar
    const { _id, correo, password, google, ...resto } = req.body;
    // TODO validar contra base de datos
    if (password) {
        // Encriptar contreña
        const salt = bcryptjs.genSaltSync(10);    // salt --> que tan complicada quieren que sea el método de encriptación, por defecto es 10
        resto.password = bcryptjs.hashSync(password, salt); // hash --> encripta en una sola vía
    }
    // actualizar el registro
    const usuario = await Usuario.findByIdAndUpdate(id, resto)
    res.json(usuario);
}

const usersDelete = async (req, res) => {   
    const { id } = req.params;
    // Borrar Fisicamente
    // const usuario = await Usuario.findByIdAndDelete( id );
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false })
    res.json({ usuario });
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete,
}