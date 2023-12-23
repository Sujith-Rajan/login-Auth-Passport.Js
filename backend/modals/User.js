const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        id: String,
        displayName: String,
        photo:String,
    },
)

const User = mongoose.model('User',UserSchema)

module.exports = User;

