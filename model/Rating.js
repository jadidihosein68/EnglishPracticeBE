const mongoose = require('mongoose');
const Joi = require('joi');

const Rating = mongoose.model('Rating', new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    flashcardSetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FlashcardSet',
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date,
}));

function validateRating(rating) {
    const schema = Joi.object({
        userId: Joi.string().required(),
        flashcardSetId: Joi.string().required(),
        rating: Joi.number().min(1).max(5).required()
    });
    return schema.validate(rating);
}

exports.Rating = Rating;
exports.validateRating = validateRating;
