const mongoose = require('mongoose')
const Schema = mongoose.Schema

const notificationSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
})

// we want to generate and persist a notification if the user has unread messages in the chat. Once they are read the notification should be made inactive
