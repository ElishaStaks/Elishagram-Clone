const mongoose = require('mongoose');
const { MONGOURI } = require('./keys');

const connectToDatabase = async () => {
    try {
        const connection = await mongoose.connect(MONGOURI, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });

        console.log(`Connected to mongo database ${connection.connections[0].name}`);

    }catch(error) {
        console.error(error);
    }
}

module.exports = connectToDatabase;