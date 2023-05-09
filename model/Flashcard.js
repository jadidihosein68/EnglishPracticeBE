
const mongoose = require('mongoose');
const Joi = require('joi');

const Flashcard = mongoose.model('Flashcard', new mongoose.Schema({
    front: String,
    back: String,
    hints: [String],
    media: String,
    flashcardSetId: mongoose.Schema.Types.ObjectId,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date,
}));

function validateFlashcard(flashcard) {
    const schema = {
        front: Joi.string().required(),
        back: Joi.string().required(),
        hints: Joi.array().items(Joi.string()),
        media: Joi.string(),
        flashcardSetId: Joi.string().required(),
    };
    return Joi.validate(flashcard, schema);
}

exports.Flashcard = Flashcard;
exports.validateFlashcard = validateFlashcard;