const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// creating user schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true
     },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20,
        trim: true // whitespace
     },
    password: {
        type: String,
        required: true,
        unique: true,
        minlength: 8,
        maxlength: 50
     }
});

// defining a mongoose pre-hook for save
userSchema.pre('save', function(next) {

    // hash and salt password
    bcrypt.hash(this.password, 10)  // 10 (minimum) is a level of complexity of hashing and salting process
    // replacing the plain text pswd with hashed and salted one
    .then ( hash => {
        this.password = hash;
        next(); // continue on the middleware chain
    })
    .catch(err => {
        console.log('Error in hashing password' + err);
        next(err);
    });
});

// to authenticate user
userSchema.methods.verifyPassword = function(inputedPlainTextPassword) {
    const hashedPassword = this.password;
    return bcrypt.compare( inputedPlainTextPassword, hashedPassword );
}

// compile into mangoose model
module.exports = mongoose.model('user', userSchema);