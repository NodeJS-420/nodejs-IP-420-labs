const translationService = require('../services/translationService');

class TranslationController {
    constructor(service = translationService) {
        this.service = service;
    }

    async getTranslation(req, res) {
        try {
            const { word, lang } = req.query;

            if (!word) {
                return res.status(400).json({ error: "Параметр 'word' обов'язковий" });
            }

            const result = await this.service.translate(word, lang);

            if (result) {
                res.json({ original: word, translation: result });
            } else {
                res.status(404).json({ error: "Переклад не знайдено" });
            }
        } catch (error) {
            res.status(500).json({ error: "Помилка сервера" });
        }
    }
}

module.exports = new TranslationController();