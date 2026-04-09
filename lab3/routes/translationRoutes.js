const express = require('express');
const router = express.Router();
const translationController = require('../controllers/translationController');

router.get('/translate', translationController.getTranslation.bind(translationController));

module.exports = router;

