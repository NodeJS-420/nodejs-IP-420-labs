const pool = require('../db/db');

class WordRepository {
    constructor(client = pool) {
        this.client = client;
    }

    async findAll() {
        const { rows } = await this.client.query(
            'SELECT id, text, lang_id AS "langId", description FROM words'
        );
        return rows;
    }

    async findOne(id) {
        const { rows } = await this.client.query(
            'SELECT id, text, lang_id AS "langId", description FROM words WHERE id = $1',
            [id]
        );
        return rows[0] || null;
    }

    async create(word) {
        const { rows } = await this.client.query(
            'INSERT INTO words (text, lang_id, description) VALUES ($1, $2, $3) RETURNING id, text, lang_id AS "langId", description',
            [word.text, word.langId, word.description || ""]
        );
        return rows[0];
    }

    async update(id, word) {
        const { rows } = await this.client.query(
            `UPDATE words 
             SET text = COALESCE($1, text), 
                 lang_id = COALESCE($2, lang_id), 
                 description = COALESCE($3, description) 
             WHERE id = $4 
             RETURNING id, text, lang_id AS "langId", description`,
            [word.text, word.langId, word.description, id]
        );
        return rows[0] || null;
    }

    async delete(id) {
        const { rows } = await this.client.query(
            'DELETE FROM words WHERE id = $1 RETURNING id, text, lang_id AS "langId", description',
            [id]
        );
        return rows[0] || null;
    }
}

module.exports = WordRepository;