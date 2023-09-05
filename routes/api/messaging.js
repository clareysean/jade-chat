const express = require('express')
const router = express.Router()
const messagingCtrl = require('../../controllers/api/messaging')
const ensureLoggedIn = require('../../config/ensureLoggedIn')

// POST /api/users
router.post('/', ensureLoggedIn, messagingCtrl.create)

module.exports = router
