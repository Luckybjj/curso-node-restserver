require('dotenv').config();     // establece las variables de entorno
const Server = require('./models/server');
// Instancia del servidor
const  server = new Server();

// ejecución del metodo listen
server.listen();

