const express = require('express')
const router = express.Router()
const messagingCtrl = require('../../controllers/api/messaging')
const ensureLoggedIn = require('../../config/ensureLoggedIn')

// POST /api/users
router.delete('/:convoId', ensureLoggedIn, messagingCtrl.delete)
router.delete('/:convoId/:msgId', ensureLoggedIn, messagingCtrl.deleteMsg)
router.put('/:convoId', ensureLoggedIn, messagingCtrl.addMessage)
router.post('/conversations', ensureLoggedIn, messagingCtrl.createConvo)
router.get('/conversations', ensureLoggedIn, messagingCtrl.getAllConvos)

module.exports = router
