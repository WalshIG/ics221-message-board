const express = require('express');
const router = express.Router();
const msgController = require('../controllers/msg');

// GET home page.
router.get('/', msgController.getMessages);

// GET about page.
//router.get('/about', mainController.about);

module.exports = router;