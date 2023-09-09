const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const fileUpload = require('express-fileupload')
require('dotenv').config()
// Connect to the database
require('./config/database')

const app = express()

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

// Put API routes here, before the "catch all" route

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX/API requests
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(port, function () {
    console.log(`Express app running on port ${port}`)
})
