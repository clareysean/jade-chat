const mongoose = require('mongoose')
const Schema = mongoose.Schema

const attachmentSchema = new Schema({
    url: { type: String, required: true },
})

const messageSchema = new Schema(
    {
        text: { type: String, required: true },
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        conversation: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        seen: { type: Boolean, default: false },
        attachments: [attachmentSchema],
    },
    { timestamps: true }
)

messageSchema.statics.setSeen = (messageId) => {
    return this.findByIdAndUpdate(messageId, { seen: true })
}

//maybe make the query lean above

const conversationSchema = new Schema(
    {
        users: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
        messages: [messageSchema],
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Conversation', conversationSchema)
