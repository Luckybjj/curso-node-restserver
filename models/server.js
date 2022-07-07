const express = require('express'); 
const cors = require('cors');
const { dbConnection } = require('../database/config');
class Server {
    // Ususalmente las propiedades se declaran las propiedades
    constructor() {
        this.app = express();           // instancia de express
        this.port = process.env.PORT;   // puerto con con su variable de entorno
        this.usersPath = '/api/usuarios';  // Rutas Disponibles
        // Conección a basde de datos
        this.conectarDB();
        // Midlewers 
        this.middlewares();
        // Rutas de mi aplicacion --> en el constructor llamaremos las rutas para disparar el método
        this.routes();
    }

    async conectarDB() {
        await dbConnection()
    }
     // los middlewares usan la palabra clave "use"
    middlewares() {
        this.app.use(cors());    // --> cors
        this.app.use(express.json());   // -->  lectura y parseo del body
        this.app.use(express.static('public'));  // --> directorio publico

    }
    // crearemos las rutas a traves de un metodo
    routes() {
        // configuracion routes con path --> '/api/usuarios'
       this.app.use(this.usersPath, require('../routes/usuarios'))
    }
    // Escucha del puerto
    listen() {
        this.app.listen(this.port, () => console.log(`Server ON --> http://localhost:${this.port}`))
    }
}

module.exports = Server