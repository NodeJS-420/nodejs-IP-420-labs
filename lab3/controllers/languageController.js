const languageService = require('../services/languageService');

class LanguageController {
    constructor(service = languageService) {
        this.service = service;
    }

    getLanguages(req, res) {
        const languages = this.service.findAll();
        res.json(languages);
    }
}

module.exports = new LanguageController();