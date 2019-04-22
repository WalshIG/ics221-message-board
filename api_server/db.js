const mongoose = require('mongoose');

let dbURI = 'mongodb://localhost:27017/msgsdb';

if (process.env.NODE_ENV === 'production') {
    dbURI = process.env.MONGO_URL;
}

mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true });
// useCreateIndex is to stop a deprecation warning with Mangoose

// connection is an object that represents the connection to db
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to '+ dbURI);
});

mongoose.connection.on('error', (err) => {
    console.log('Mongoose connection error:'+ err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

// to load the application
require('./models/message_schema');
require('./models/user_schema');