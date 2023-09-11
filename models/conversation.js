const mongoose = require('mongoose')
const Schema = mongoose.Schema

const attachmentSchema = new Schema({
    url: { type: String, required: true },
})

const messageSchema = new Schema(
    {
        text: { type: String, required: true },
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        // userName: { type: String, required: true },
        // pictureUrl: { type: String }, // these arent't necessary with the current refactor. Icebox test and confirm redundancy
        conversation: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        seen: { type: Boolean, default: false },
        attachments: [attachmentSchema],
    },
    { timestamps: true }
)

messageSchema.methods.setSeen = async function (messageId) {
    return await this.findByIdAndUpdate(messageId, { seen: true })
}

const Message = mongoose.model('Message', messageSchema)

const conversationSchema = new Schema(
    {
        users: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
        messages: [messageSchema],
        createdByUser: { type: Schema.Types.ObjectId, required: true },
    },
    {
        timestamps: true,
    }
)

const Conversation = mongoose.model('Conversation', conversationSchema)

module.exports = {
    Conversation,
    Message,
}
