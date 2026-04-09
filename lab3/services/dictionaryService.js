const dictionaryRepository = require('../repositories/dictionaryRepository');

class DictionaryService {
    constructor(repository = dictionaryRepository) {
        this.repository = repository;
    }

    findAll(callback) {
        this.repository.findAll(callback);
    }

    findOne() {}

    create() {}

    update() {}

    delete() {}
}

module.exports = new DictionaryService();
