const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    userName: {
        type: String,
        required: [true, 'Username is required']
    },

    email: {
        type: String,
        required: [true, 'Email is required']
    },

    password: {
        type: String,
        required: [true, 'Password is required']
    },

    isAdmin: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', userSchema);