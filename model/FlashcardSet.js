const mongoose = require('mongoose');
const Joi = require('joi');

const FlashcardSet = mongoose.model('FlashcardSet', new mongoose.Schema({
    title: String,
    subject: String,
    createdBy: mongoose.Schema.Types.ObjectId,
    public: Boolean,
    flashcards: [{
        front: String,
        back: String,
        hints: [String],
        media: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date,
}));

function validateFlashcardSet(flashcardSet) {
    const schema = {
        title: Joi.string().min(3).required(),
        subject: Joi.string().min(3).required(),
        public: Joi.boolean(),
        flashcards: Joi.array().items(Joi.object({
            front: Joi.string().required(),
            back: Joi.string().required(),
        })),
    };
    return Joi.validate(flashcardSet, schema);
}

exports.FlashcardSet = FlashcardSet;
exports.validateFlashcardSet = validateFlashcardSet;
