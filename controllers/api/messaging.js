const { Message, Conversation } = require('../../models/conversation')
const mongoose = require('mongoose')

module.exports = {
    create,
    getAllConvos,
    createConvo,
    delete: deleteConvo,
    addMessage,
}

async function create(req, res) {
    console.log(`bungus`)
}

async function getAllConvos(req, res) {
    const currentUserId = req.user._id

    try {
        const userConvos = await Conversation.find({
            users: { $in: [currentUserId] },
        }).populate('users') // populate the 'users' field with user documents

        res.json(userConvos)
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function createConvo(req, res) {
    try {
        const newConvo = await Conversation.create({ users: [req.user] })
        await newConvo.populate(['users', { path: 'users' }])
        res.json(newConvo)
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function deleteConvo(req, res) {
    try {
        const convoId = req.params.id
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
        const convoId = req.params.id

        const conversation =
            await Conversation.findById(convoId).populate('users')

        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' })
        }
        const message = await Message.create({
            text: req.body.message,
            user: req.user._id,
            userName: req.user.name,
            pictureUrl: req.user.profilePictureUrl,
            conversation: convoId,
        })

        conversation.messages.push(message)
        await conversation.save()
        return res.json(conversation)
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function getAllMessages(req, res) {}
