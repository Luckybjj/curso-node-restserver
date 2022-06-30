require('dotenv').config();
const Server = require('./models/server');
// crear una instancia del servidor
const  server = new Server();


server.listen();

