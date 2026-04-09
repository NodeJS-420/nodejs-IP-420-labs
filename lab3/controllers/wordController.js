const wordService = require('../services/wordService');

class WordController {
    constructor(service = wordService) {
        this.service = service;
    }

    getWords(req, res) {
        this.service.findAll()
            .then(data => res.json(data))
            .catch(err => res.status(500).send(err.message || "Помилка сервера"));
    }
}

module.exports = new WordController();