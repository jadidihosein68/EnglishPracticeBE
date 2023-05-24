const mongoose = require('mongoose');
const Joi = require('joi');

const FlashcardSet = mongoose.model('FlashcardSet', new mongoose.Schema({
    title: String,
    description: String,
    imageUrl: String,
    subject: String,
    createdBy: mongoose.Schema.Types.ObjectId,
    ispublic: Boolean,
    status: {
        type: String,
        default: 'Draft'
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    flashcards: [{
        front: String,
        back: String,
        hints: String,
        media: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date,
}));

function validateFlashcardSet(flashcardSet) {
    const schema = Joi.object({
        //_id: Joi.string(),
        title: Joi.string().min(3).required(),
        description: Joi.string().min(3),
        imageUrl : Joi.string().min(5).required(),
        ispublic: Joi.boolean(),
        status: Joi.string(),
        subject: Joi.string(),
        flashcards: Joi.array().items(Joi.object({
        front: Joi.string().required(),
        back: Joi.string().required(),
        hints : Joi.string(),
        })),
    });

    return schema.validate(flashcardSet);
}


exports.FlashcardSet = FlashcardSet;
exports.validateFlashcardSet = validateFlashcardSet;
