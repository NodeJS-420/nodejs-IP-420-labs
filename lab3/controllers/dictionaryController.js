const dictionaryService = require('../services/dictionaryService');

class DictionaryController {
    constructor(service = dictionaryService) {
        this.service = service;
    }

    getDictionaries(req, res) {
        this.service.findAll((err, data) => {
            if (err) return res.status(500).send("Помилка сервера");
            res.json(data);
        });
    }
}

module.exports = new DictionaryController();