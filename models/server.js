const express = require('express'); 
const cors = require('cors');
class Server {
    // Ususalmente las propiedades se declaran las propiedades
    constructor() {
        // instancia de express
        this.app = express();
        // puerto con con su variable de entorno
        this.port = process.env.PORT
        // Rutas Disponibles
        this.usersPath = '/api/users';
        // Midlewers 
        this.middlewares();
        // Rutas de mi aplicacion --> en el constructor llamaremos las rutas para disparar el método
        this.routes();
    }
     // los middlewares usan la plabra clase "use"
    middlewares() {
        this.app.use(cors());    // --> cors
        this.app.use(express.json());   // -->  lectura y parseo del body
        this.app.use(express.static('public'));  // --> directorio publico

    }
    // crearemos las rutas a traves de un metodo
    routes() {
        // configuracion routes con path --> '/api/usuarios'
       this.app.use(this.usersPath, require('../routes/users'))
    }
    // Escucha del puerto
    listen() {
        this.app.listen(this.port, () => console.log(`Server ON --> http://localhost:${this.port}`))
    }
}

module.exports = Server