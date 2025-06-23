const mongoose = require("mongoose");

const commsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },

    comment: {
        type: String,
        required: [true, 'Comment cannot be empty']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    content: {
        type: String,
        required: [true, 'Content is required']
    },

    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    
    comments: [commsSchema],
    createdAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Blog', blogSchema)