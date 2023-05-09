const mongoose = require('mongoose');
const Joi = require('joi');

const User = mongoose.model('User', new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    googleId: String,
    bio: String,
    premium: Boolean,
    progress: [{
        flashcardSetId: mongoose.Schema.Types.ObjectId,
        lastStudied: Date,
        performance: {
            correct: Number,
            incorrect: Number
        }
    }],

    subscriptions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FlashcardSet'
    }],

    flashcardSets: [mongoose.Schema.Types.ObjectId],
    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: Date,
}));

function validateUser(user) {
    const schema = {
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        googleId: Joi.string().required(),
        premium: Joi.boolean(),
        bio: Joi.string(),
    };
    return Joi.validate(user, schema);
}

exports.User = User;
exports.validateUser = validateUser;
