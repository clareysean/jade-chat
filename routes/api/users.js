const express = require('express')
const router = express.Router()
const usersCtrl = require('../../controllers/api/users')
const ensureLoggedIn = require('../../config/ensureLoggedIn')

// POST /api/users
router.post('/', usersCtrl.create)
router.post('/login', usersCtrl.login)
router.get('/all', ensureLoggedIn, usersCtrl.getActiveUsers)
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken)
router.put('/:contactId/:convoId', ensureLoggedIn, usersCtrl.addToConvo)
router.delete('/:convoId/:contactId', ensureLoggedIn, usersCtrl.removeFromConvo)

module.exports = router
