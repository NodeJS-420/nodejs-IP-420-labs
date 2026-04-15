const pool = require('../db/db'); 

class LanguageRepository {
    constructor(client = pool) {
        this.client = client;
    }

    async findAll() {
        const { rows } = await this.client.query('SELECT id, name FROM languages');
        return rows;
    }

    async findOne(id) {
        const { rows } = await this.client.query('SELECT id, name FROM languages WHERE id = $1', [id]);
        return rows[0] || null;
    }

    async create(language) {
        const { rows } = await this.client.query(
            'INSERT INTO languages (name) VALUES ($1) RETURNING id, name',
            [language.name]
        );
        return rows[0];
    }

    async update(id, language) {
        const { rows } = await this.client.query(
            'UPDATE languages SET name = COALESCE($1, name) WHERE id = $2 RETURNING id, name',
            [language.name, id]
        );
        return rows[0] || null;
    }

    async delete(id) {
        const { rows } = await this.client.query(
            'DELETE FROM languages WHERE id = $1 RETURNING id, name',
            [id]
        );
        return rows[0] || null;
    }
}

module.exports = LanguageRepository;