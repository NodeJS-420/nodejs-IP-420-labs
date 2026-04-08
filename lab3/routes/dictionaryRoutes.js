const express = require('express');
const router = express.Router();
const dictionaryController = require('../controllers/dictionaryController');

router.get('/dictionaries', dictionaryController.getDictionaries.bind(dictionaryController));

module.exports = router;

