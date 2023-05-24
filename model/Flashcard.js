
const mongoose = require('mongoose');
const Joi = require('joi');

const Flashcard = mongoose.model('Flashcard', new mongoose.Schema({
    front: String,
    back: String,
    hints: String,
    media: String,
    flashcardSetId: mongoose.Schema.Types.ObjectId,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date,
    soundIsActive: Boolean,
}));

function validateFlashcard(flashcard) {
    const schema = Joi.object({
        front: Joi.string().required(),
        back: Joi.string().required(),
        hints: Joi.string(),
        media: Joi.string(),
        flashcardSetId: Joi.string(),
        soundIsActive: Joi.boolean()
    });
    //return Joi.validate(flashcard, schema);
    return schema.validate(flashcard);
}

exports.Flashcard = Flashcard;
exports.validateFlashcard = validateFlashcard;