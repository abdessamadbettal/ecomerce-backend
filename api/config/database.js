const mongoose = require('mongoose');

const connectDatabase = () => {
    const MONGO_URI = process.env.MONGO_URI;
    mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
        .then((data) => {
            console.log(`Mongoose Connected with Host: ${data.connection.host}`);
        });
}

module.exports = connectDatabase;