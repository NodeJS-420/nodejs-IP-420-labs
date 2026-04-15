const pool = require('../db/db');

class DictionaryRepository {
    constructor(client = pool) {
        this.client = client;
    }

    async findAll() {
        const { rows } = await this.client.query(
            'SELECT id, name, source_lang_id AS "sourceLangId", target_lang_id AS "targetLangId" FROM dictionaries'
        );
        return rows;
    }

    async findOne(id) {
        const { rows } = await this.client.query(
            'SELECT id, name, source_lang_id AS "sourceLangId", target_lang_id AS "targetLangId" FROM dictionaries WHERE id = $1',
            [id]
        );
        return rows[0] || null;
    }

    async create(dictionary) {
        const { rows } = await this.client.query(
            'INSERT INTO dictionaries (name, source_lang_id, target_lang_id) VALUES ($1, $2, $3) RETURNING id, name, source_lang_id AS "sourceLangId", target_lang_id AS "targetLangId"',
            [dictionary.name, dictionary.sourceLangId, dictionary.targetLangId]
        );
        return rows[0];
    }

    async update(id, dictionary) {
        const { rows } = await this.client.query(
            `UPDATE dictionaries 
             SET name = COALESCE($1, name), 
                 source_lang_id = COALESCE($2, source_lang_id), 
                 target_lang_id = COALESCE($3, target_lang_id) 
             WHERE id = $4 
             RETURNING id, name, source_lang_id AS "sourceLangId", target_lang_id AS "targetLangId"`,
            [dictionary.name, dictionary.sourceLangId, dictionary.targetLangId, id]
        );
        return rows[0] || null;
    }

    async delete(id) {
        const { rows } = await this.client.query(
            'DELETE FROM dictionaries WHERE id = $1 RETURNING id, name, source_lang_id AS "sourceLangId", target_lang_id AS "targetLangId"',
            [id]
        );
        return rows[0] || null;
    }
}

module.exports = DictionaryRepository;