const wordRepository = require('../repositories/wordRepository');
const translationRepository = require('../repositories/translationRepository');

class TranslationService {
    constructor(wordRepo = wordRepository, translationRepo = translationRepository) {
        this.wordRepository = wordRepo;
        this.translationRepository = translationRepo;
    }

    findAll() { }

    findOne() { }

    create() { }

    update() { }

    delete() { }

    async translate(wordText, targetLangId) {
        const [words, translations] = await Promise.all([
            this.wordRepository.findAll(),
            this.translationRepository.findAll(),
        ]);

        const sourceWord = words.find(
            w => w.text.toLowerCase() === String(wordText).toLowerCase()
        );
        if (!sourceWord) return null;

        const translationEntry = translations.find(
            t => t.sourceWordId === sourceWord.id
        );
        if (!translationEntry) return null;

        const targetWord = words.find(w => w.id === translationEntry.targetWordId);
        if (!targetWord) return null;

        if (targetLangId && targetWord.langId !== parseInt(targetLangId)) {
            return null;
        }

        return targetWord.text;
    }
}

module.exports = new TranslationService();