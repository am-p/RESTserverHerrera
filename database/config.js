const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
	await mongoose.connect(process.env.MONGODB_ATLAS);
	console.log('Base de datos creada');
    } catch(error) {
	console.log(error);
	throw new Error('Error a la hora de iniciar la database');
    }

    
};

module.exports = {
    dbConnection
};



