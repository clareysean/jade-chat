const mongoose = require('mongoose')
const Schema = mongoose.Schema

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

messageSchema.methods.setSeen = async function (messageId) {
    return await this.findByIdAndUpdate(messageId, { seen: true })
}

module.exports = mongoose.model('Message', messageSchema)
