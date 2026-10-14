const {verify} = require('../helpers/token')
const User = require('../models/User')

module.exports = async (req, res, next) => {
    const { id } = verify(req.cookies.token)
    const user = await User.findOne({ _id:id })
    if(!user){
        res.send({error:'Authentication user not found'})
        return
    }
    req.user = user
    next()
}