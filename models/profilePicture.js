const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./user'.Schema)

const profilePictureSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        url: { type: String, required: true },
    },
    { timestamps: true }
)

module.exports = mongoose.model('ProfilePicture', profilePictureSchema)
