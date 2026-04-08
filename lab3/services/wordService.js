const wordRepository = require('../repositories/wordRepository');

class WordService {
	constructor(repository = wordRepository) {
		this.repository = repository;
	}

	findAll() {
		return this.repository.findAll()
			.then(data => data)
			.catch(err => Promise.reject(err));
	}

	findOne() {}

	create() {}

	update() {}

	delete() {}
}

module.exports = new WordService();

