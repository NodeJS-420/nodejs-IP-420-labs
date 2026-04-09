const express = require('express');
const router = express.Router();
const languageController = require('../controllers/languageController');

router.get('/languages', languageController.getLanguages.bind(languageController));

module.exports = router;

