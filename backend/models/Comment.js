const mongoose = require('mongoose')

const CommentScheme  = mongoose.Schema({

    content: {
        type: String,
        required: true,
    },
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},

}, {timestamps: true})

const Comment = mongoose.model('Comment', CommentScheme)
module.exports = Comment