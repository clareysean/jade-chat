const express = require('express')
const router = express.Router()
const usersCtrl = require('../../controllers/api/users')
const ensureLoggedIn = require('../../config/ensureLoggedIn')

// POST /api/users
router.post('/', usersCtrl.create)
router.post('/login', usersCtrl.login)
router.post('/upload', ensureLoggedIn, usersCtrl.uploadPhoto)
router.get('/all', usersCtrl.getActiveUsers)
router.get('/user', usersCtrl.getDisplayUser)
router.get('/check-token', usersCtrl.checkToken)
router.delete('/:fileName', ensureLoggedIn, usersCtrl.deletePhoto)
router.put('/:contactId/:convoId', ensureLoggedIn, usersCtrl.addToConvo)
router.delete('/:convoId/:contactId', ensureLoggedIn, usersCtrl.removeFromConvo)

module.exports = router
