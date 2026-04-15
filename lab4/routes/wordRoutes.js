const express = require('express');
const router = express.Router();
const wordController = require('../controllers/wordController');

router.get('/words', wordController.getWords.bind(wordController));
router.post('/words', wordController.createWord.bind(wordController));
router.get('/words/:id/edit', (req, res) => wordController.getEditPage(req, res));
router.post('/words/:id/update', (req, res) => wordController.updateWord(req, res));
router.post('/words/:id/delete', (req, res) => wordController.deleteWord(req, res));
router.get('/words/:id', wordController.getWordById.bind(wordController));
router.put('/words/:id', wordController.updateWord.bind(wordController));
router.delete('/words/:id', wordController.deleteWord.bind(wordController));

module.exports = router;

