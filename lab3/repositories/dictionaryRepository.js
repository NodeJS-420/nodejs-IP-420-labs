const { readJsonCallback } = require('../utils/fileLoaders');
const path = require('path');

const dataPath = path.join('data', 'dictionaries.json');

class DictionaryRepository {
    constructor() { }

    findAll(callback) {
        readJsonCallback(dataPath, callback);
    }

    findOne(id, callback) {
        this.findAll((err, items) => {
            if (err) return callback(err, null);
            const found = items.find(x => x.id === parseInt(id)) || null;
            callback(null, found);
        });
    }
}

module.exports = new DictionaryRepository();