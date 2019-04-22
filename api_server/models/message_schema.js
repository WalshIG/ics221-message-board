const mongoose = require('mongoose');

// creating schema messages
const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20
    },
    msg: String
});

// compile into mangoose model
module.exports = mongoose.model('message', messageSchema);