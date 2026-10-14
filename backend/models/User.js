const mongoose = require('mongoose')
const ROLES = require('../constants/role.js')

const UserScheme  = mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        default: ROLES.USER
    }
}, {timestamps: true})

const User = mongoose.model('User', UserScheme)
module.exports = User