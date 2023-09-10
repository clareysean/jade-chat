const express = require('express')
http = require('http')
// const cors = require('cors')
const { Server } = require('socket.io')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const fileUpload = require('express-fileupload')
require('dotenv').config()
// Connect to the database
require('./config/database')

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
})

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'build')))
app.use(fileUpload())
app.use(require('./config/checkToken'))

app.use('/api/users', require('./routes/api/users'))
const ensureLoggedIn = require('./config/ensureLoggedIn')
app.use('/api/messaging', ensureLoggedIn, require('./routes/api/messaging'))

const port = process.env.PORT || 3001

io.on('connection', (socket) => {
    console.log(`User connected ${socket.id}`)

    socket.on('join_room', (data) => {
        const { username, room } = data // Data sent from client when join_room event emitted
        socket.join(room) // Join the user to a socket room
        console.log(`User joined ${room}`)
    })

    socket.on('send_message', (data) => {
        const { message, room } = data
        io.in(room).emit('receive_message', message) // Send to all users in room, including sender
    })

    socket.on('convo_leave', (data) => {
        console.log(`server ran`)
        const { convo, room } = data
        io.in(room).emit('convo_leave', convo) // Send to all users in room, including sender
    })
})
// Put API routes here, before the "catch all" route

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX/API requests
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

// app.listen(port, function () {
//     console.log(`Express app running on port ${port}`)
// })
server.listen(port, () => `Server is running on ${port}`)
