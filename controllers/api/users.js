const User = require('../../models/user')
const { Conversation } = require('../../models/conversation')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid') // Import the uuid library
const {
    S3Client,
    PutObjectCommand,
    DeleteObjectCommand,
} = require('@aws-sdk/client-s3')
const s3Config = require('../../config/s3Config')
const s3Client = new S3Client(s3Config)

module.exports = {
    create,
    login,
    checkToken,
    getActiveUsers,
    addToConvo,
    removeFromConvo,
    uploadPhoto,
    deletePhoto,
    getDisplayUser,
}

async function create(req, res) {
    try {
        const user = await User.create(req.body)
        const token = createJWT(user)
        res.json(token)
    } catch (err) {
        res.status(400).json(err)
    }
}

function createJWT(user) {
    return jwt.sign(
        // data payload
        { user },
        process.env.SECRET,
        { expiresIn: '24h' }
    )
}

async function comparePasswords(plainPassword, hashedPassword) {
    try {
        const match = await bcrypt.compare(plainPassword, hashedPassword)
        return match
    } catch (error) {
        throw error
    }
}

async function login(req, res) {
    try {
        const userEmail = req.body.email
        const providedPassword = req.body.password
        const user = await User.findOne({ email: userEmail })

        if (user && (await comparePasswords(providedPassword, user.password))) {
            const token = createJWT(user)
            res.json(token) // send back json token that we can use to find the current user
        } else {
            res.status(401).json({ message: 'Invalid email or password' })
        }
    } catch (err) {
        res.status(400).json(err)
    }
}

function checkToken(req, res) {
    // req.user will always be there for you when a token is sent
    // because of config/checkToken, which modifies the request by extracting the token from Auth header and parsing user and exp data.
    console.log('req.user', req.user)
    res.json(req.exp)
}

async function getActiveUsers(req, res) {
    const currentUserId = req.user._id
    const activeUsers = await User.find({ _id: { $ne: currentUserId } })
    return res.json(activeUsers)
}

async function addToConvo(req, res) {
    try {
        const userId = req.params.contactId
        const convoId = req.params.convoId

        const updatedConversation = await Conversation.findByIdAndUpdate(
            convoId,
            { $addToSet: { users: userId } },
            { new: true } // returns the updated conversation document
        )
        await updatedConversation.populate(['users', { path: 'users' }])
        console.log(updatedConversation)
        return res.json(updatedConversation)
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function removeFromConvo(req, res) {
    try {
        const userId = req.params.contactId
        const convoId = req.params.convoId

        const updatedConversation = await Conversation.findByIdAndUpdate(
            convoId,
            { $pull: { users: userId } }, // $pull removes the user object id from the users array
            { new: true }
        ).populate('users')

        if (!updatedConversation) {
            return res.status(404).json({ error: 'Conversation not found' })
        }

        console.log(updatedConversation)
        return res.json(updatedConversation)
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}
async function uploadPhoto(req, res) {
    const file = req.files.file
    const fileExtension = file.name.split('.').pop() // Get the file extension
    const uuid = uuidv4() // generates a unique identifier string
    // Take the first 8 characters as a unique string
    const uniqueString = uuid.slice(0, 8)
    const uniqueFileName = `${uniqueString}.${fileExtension}`
    const bucketParams = {
        Bucket: process.env.S3_BUCKET,
        Key: uniqueFileName,
        Body: file.data,
    }
    try {
        await s3Client.send(new PutObjectCommand(bucketParams))
        const s3Url = `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${uniqueFileName}`

        const query = { _id: req.user._id }
        const update = { $set: { profilePictureUrl: s3Url } }
        const options = { upsert: true }

        const updatedUser = await User.updateOne(query, update, options)
        res.json(updatedUser)
    } catch (err) {
        console.log('Error', err)
        res.status(500).send('Error uploading object')
    }
}

//TODO on photo upload delete existing photo if it exists

async function deletePhoto(req, res) {
    try {
        const fileName = req.params.fileName // Assuming you pass the file name to delete as a URL parameter
        console.log(fileName)
        const bucketParams = {
            Bucket: process.env.S3_BUCKET,
            Key: fileName, // Specify the file name you want to delete
        }

        const deleteResponse = await s3Client.send(
            new DeleteObjectCommand(bucketParams)
        )
        console.log(deleteResponse)

        if (deleteResponse) {
            const currentUserId = req.user._id
            const updatedUser = await User.findByIdAndUpdate(
                currentUserId,
                { $unset: { profilePictureUrl: '' } }, // Use $unset to remove the profilePictureUrl field
                { new: true }
            )
            res.status(200).json({ message: 'File deleted successfully' })
        } else {
            res.status(404).json({ error: 'File not found' })
        }
    } catch (err) {
        console.error('Error:', err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

//TODO on photo upload delete existing photo if it exists

async function getDisplayUser(req, res) {
    const currentUserId = req.user._id
    try {
        const displayUser = await User.findById(currentUserId)
        res.json(displayUser)
    } catch (error) {
        console.error('Error:', err)
        res.status(404).json({ error: 'Internal Server Error: User not found' })
    }
}
