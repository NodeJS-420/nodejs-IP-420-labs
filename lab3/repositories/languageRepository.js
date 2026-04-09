const { readJsonSync } = require('../utils/fileLoaders');
const path = require('path');

const dataPath = path.join('data', 'languages.json');

class LanguageRepository {
	constructor() {}

	findAll() {
		return readJsonSync(dataPath);
	}

	findOne(id) {
		const items = this.findAll();
		return items.find(x => x.id === parseInt(id)) || null;
	}
}

module.exports = new LanguageRepository();