const { Message, Conversation } = require('../../models/conversation')
const mongoose = require('mongoose')

module.exports = {
    getAllConvos,
    createConvo,
    delete: deleteConvo,
    addMessage,
    deleteMsg,
}

async function getAllConvos(req, res) {
    const currentUserId = req.user._id

    try {
        const userConvos = await Conversation.find({
            users: { $in: [currentUserId] },
        })
            .populate('users')
            .populate({
                path: 'messages.user',
                model: 'User',
            })

        res.json(userConvos)
        console.log(userConvos)
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function createConvo(req, res) {
    try {
        const newConvo = await Conversation.create({
            users: [req.user],
            createdByUser: req.user._id,
        })
        await newConvo.populate(['users', { path: 'users' }])
        res.json(newConvo)
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function deleteConvo(req, res) {
    try {
        const convoId = req.params.convoId
        console.log(`${convoId} inj the controller`)
        const convoToDelete = await Conversation.findById(convoId)

        for (const message of convoToDelete.messages) {
            const messageId = mongoose.Types.ObjectId(message._id) // Cast to ObjectId
            await Message.findByIdAndDelete(messageId)
        }
        const deletedConvo = await convoToDelete.delete()
        res.json(deletedConvo)
    } catch (error) {
        console.error('Error:', error)
        res.status(404).json({ error: 'Document not found' })
    }
}

async function addMessage(req, res) {
    try {
        const convoId = req.params.convoId

        // Query the conversation and populate 'users' and 'messages.user'
        const conversation = await Conversation.findById(convoId)
            .populate('users')
            .populate({
                path: 'messages.user', // Populate the 'user' field within the 'messages' array
                model: 'User', // Specify the model to use for populating the user
            })

        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' })
        }

        // Create a message without populating the 'user' field
        const message = await Message.create({
            text: req.body.message,
            user: req.user._id,
            userName: req.user.name,
            pictureUrl: req.user.profilePictureUrl,
            conversation: convoId,
        })

        // Populate the 'user' field of the newly created message
        await message.populate('user')

        conversation.messages.push(message)
        await conversation.save()

        return res.json(conversation)
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function deleteMsg(req, res) {
    const convoId = req.params.convoId
    const msgId = req.params.msgId

    try {
        // Find and update the conversation while populating 'users' and 'messages.user'
        const updatedConversation = await Conversation.findByIdAndUpdate(
            convoId,
            { $pull: { messages: { _id: msgId } } },
            { new: true }
        )
            .populate('users')
            .populate({
                path: 'messages.user',
                model: 'User',
            })

        if (!updatedConversation) {
            return res.status(404).json({ error: 'Conversation not found' })
        }

        await Message.findByIdAndDelete(msgId)

        console.log(updatedConversation)
        res.json(updatedConversation)
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}
