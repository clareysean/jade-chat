const Conversation = require('../../models/conversation')

module.exports = {
    create,
    getAllConvos,
    createConvo,
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
