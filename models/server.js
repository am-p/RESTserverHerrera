const express = require('express');


class Server {
    constructor() {
	this.app = express();
	this.port = process.env.PORT;
	this.middlewares();
	this.routes();
    }

    middlewares() {
	this.app.use(express.static('public'));
    }

    routes() {//acá lo empecé como funcion y despues lo pasé a flechas!!!
	this.app.get('/api', (req, res) => {
	    res.send('Hello World');
	});
    }

    listen() {
	this.app.listen(this.port, () => {
	    console.log('Servidor corriendo en puerto:', this.port);
	});

    }
    
}

module.exports = Server;
