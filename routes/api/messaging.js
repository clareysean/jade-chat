const express = require('express')
const router = express.Router()
const messagingCtrl = require('../../controllers/api/messaging')
const ensureLoggedIn = require('../../config/ensureLoggedIn')

// POST /api/users
router.post('/', ensureLoggedIn, messagingCtrl.create)
router.delete('/:id', ensureLoggedIn, messagingCtrl.delete)
router.put('/:id', ensureLoggedIn, messagingCtrl.addMessage)
router.post('/conversations', ensureLoggedIn, messagingCtrl.createConvo)
router.get('/conversations', ensureLoggedIn, messagingCtrl.getAllConvos)

module.exports = router
