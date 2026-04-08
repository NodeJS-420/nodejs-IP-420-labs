const express = require('express');
const router = express.Router();
const wordController = require('../controllers/wordController');

router.get('/words', wordController.getWords.bind(wordController));

module.exports = router;

