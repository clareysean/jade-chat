const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports = {
    create,
    login,
    checkToken,
    getActiveUsers,
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
    console.log(`in the controller`)
    const activeUsers = await User.find()
    console.log(activeUsers)
    return res.json(activeUsers)
}
