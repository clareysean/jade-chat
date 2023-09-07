const Conversation = require('../../models/conversation')

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
        }).populate('users') // this will populate the 'users' field with user documents

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
        console.log(convoId)
        const deletedConvo = await Conversation.findByIdAndDelete(convoId)
        console.log(deletedConvo)
        res.json(deletedConvo)
    } catch (error) {
        console.error('Error:', error)
        res.status(404).json({ error: 'Document not found' })
    }
}

async function addMessage(req, res) {
    try {
        const msg = req.body.message
        const convoId = req.params.id

        const messageData = {
            text: msg,
            user: req.user._id,
            conversation: convoId,
        }

        const updatedConversation = await Conversation.findByIdAndUpdate(
            convoId,
            { $push: { messages: messageData } },
            { new: true }
        )

        return res.json(updatedConversation)
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}
