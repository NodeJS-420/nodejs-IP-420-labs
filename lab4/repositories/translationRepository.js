const pool = require('../db/db');

class TranslationRepository {
    constructor(client = pool) {
        this.client = client;
    }

    async findAll() {
        const { rows } = await this.client.query(
            'SELECT id, dictionary_id AS "dictionaryId", source_word_id AS "sourceWordId", target_word_id AS "targetWordId" FROM translations'
        );
        return rows;
    }

    async findOne(id) {
        const { rows } = await this.client.query(
            'SELECT id, dictionary_id AS "dictionaryId", source_word_id AS "sourceWordId", target_word_id AS "targetWordId" FROM translations WHERE id = $1',
            [id]
        );
        return rows[0] || null;
    }

    async create(translation) {
        const { rows } = await this.client.query(
            'INSERT INTO translations (dictionary_id, source_word_id, target_word_id) VALUES ($1, $2, $3) RETURNING id, dictionary_id AS "dictionaryId", source_word_id AS "sourceWordId", target_word_id AS "targetWordId"',
            [translation.dictionaryId, translation.sourceWordId, translation.targetWordId]
        );
        return rows[0];
    }

    async update(id, translation) {
        const { rows } = await this.client.query(
            `UPDATE translations 
             SET dictionary_id = COALESCE($1, dictionary_id), 
                 source_word_id = COALESCE($2, source_word_id), 
                 target_word_id = COALESCE($3, target_word_id) 
             WHERE id = $4 
             RETURNING id, dictionary_id AS "dictionaryId", source_word_id AS "sourceWordId", target_word_id AS "targetWordId"`,
            [translation.dictionaryId, translation.sourceWordId, translation.targetWordId, id]
        );
        return rows[0] || null;
    }

    async delete(id) {
        const { rows } = await this.client.query(
            'DELETE FROM translations WHERE id = $1 RETURNING id, dictionary_id AS "dictionaryId", source_word_id AS "sourceWordId", target_word_id AS "targetWordId"',
            [id]
        );
        return rows[0] || null;
    }
}

module.exports = TranslationRepository;