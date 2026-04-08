const languageRepository = require('../repositories/languageRepository');

class LanguageService {
    constructor(repository = languageRepository) {
        this.repository = repository;
    }

    findAll() {
        return this.repository.findAll();
    }

    findOne() { }

    create() { }

    update() { }

    delete() { }
}

module.exports = new LanguageService();