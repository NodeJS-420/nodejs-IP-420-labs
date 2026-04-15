const WordRepository = require('../repositories/wordRepository');
const TranslationRepository = require('../repositories/translationRepository');
const UnitOfWork = require('../db/UnitOfWork'); 

class TranslationService {
    constructor() {
        this.wordRepository = new WordRepository();
        this.translationRepository = new TranslationRepository();
    }

    async findAll() {
        return await this.translationRepository.findAll();
    }

    async findOne(id) {
        return await this.translationRepository.findOne(id);
    }

    async create(data) {
        if (!data.dictionaryId || !data.sourceWordId || !data.targetWordId) {
            throw new Error("Translation dictionaryId, sourceWordId and targetWordId are required");
        }
        return await this.translationRepository.create(data);
    }

    async update(id, data) {
        if (!id) throw new Error("Translation ID is required");
        const result = await this.translationRepository.update(id, data);
        if (!result) throw new Error("Translation not found");
        return result;
    }

    async delete(id) {
        if (!id) throw new Error("Translation ID is required");
        const result = await this.translationRepository.delete(id);
        if (!result) throw new Error("Translation not found");
        return result;
    }

    async translate(wordText, targetLangId) {
        const [words, translations] = await Promise.all([
            this.wordRepository.findAll(),
            this.translationRepository.findAll(),
        ]);

        const sourceWord = words.find(w => w.text.toLowerCase() === String(wordText).toLowerCase());
        if (!sourceWord) return null;

        const translationEntry = translations.find(t => t.sourceWordId === sourceWord.id);
        if (!translationEntry) return null;

        const targetWord = words.find(w => w.id === translationEntry.targetWordId);
        if (!targetWord) return null;

        if (targetLangId && targetWord.langId !== parseInt(targetLangId)) return null;

        return targetWord.text;
    }

    
    // TRANSACTION EXAMPLE
    
    async createWordWithTranslation(dictionaryId, sourceWordData, targetWordId) {
        const uow = new UnitOfWork();
        
        try {
            await uow.start(); // BEGIN - початок транзакції

            // 1. Ініціалізуємо репозиторії транзакційним клієнтом
            const wordRepo = new WordRepository(uow.getClient());
            const translationRepo = new TranslationRepository(uow.getClient());

            // 2. Створюємо нове слово
            const newWord = await wordRepo.create(sourceWordData);

            // 3. Створюємо переклад, прив'язаний до нового слова
            const newTranslation = await translationRepo.create({
                dictionaryId: dictionaryId,
                sourceWordId: newWord.id,
                targetWordId: targetWordId
            });

            await uow.commit(); // COMMIT - успішно зберігаємо
            return { word: newWord, translation: newTranslation };

        } catch (error) {
            await uow.rollback(); // ROLLBACK - відміняємо зміни, якщо була помилка
            console.error("Transaction failed and rolled back:", error.message);
            throw error;
        }
    }
}

module.exports = new TranslationService();