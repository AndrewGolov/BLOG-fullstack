const mongoose = require('mongoose')
const validator = require('validator')

const PostScheme  = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
        validate:{
            validator: validator.isURL,
            message:'Image is should be a valid URL',
        }
    },
    content: {
        type: String,
        required: true,
    },
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],

}, {timestamps: true})

const Post = mongoose.model('Post', PostScheme)
module.exports = Post