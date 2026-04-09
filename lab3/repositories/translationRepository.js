const { readJsonAsync } = require('../utils/fileLoaders');
const path = require('path');

const dataPath = path.join('data', 'translations.json');

class TranslationRepository {
	constructor() {}

	async findAll() {
		return await readJsonAsync(dataPath);
	}

	async findOne(id) {
		const items = await this.findAll();
		return items.find(x => x.id === parseInt(id)) || null;
	}
}

module.exports = new TranslationRepository();