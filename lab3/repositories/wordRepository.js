const { readJsonPromise } = require('../utils/fileLoaders');
const path = require('path');

const dataPath = path.join('data', 'words.json');

class WordRepository {
	constructor() {}

	findAll() {
		return readJsonPromise(dataPath);
	}

	findOne(id) {
		return this.findAll().then(items => items.find(x => x.id === parseInt(id)) || null);
	}
}

module.exports = new WordRepository();
