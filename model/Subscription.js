
const mongoose = require('mongoose');
const Joi = require('joi');

const Subscription = mongoose.model('Subscription', new mongoose.Schema({
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
    subscribedOn: {
        type: Date,
        default: Date.now
    },
    endDate: Date,
}));

function validateSubscription(subscription) {
    const schema = Joi.object({
        userId: Joi.string().required(),
        flashcardSetId: Joi.string().required(),
        lastAccessed: Joi.date(),
        userEngagement: Joi.number(),
        endDate: Joi.date().required(),
    });
    return schema.validate(subscription);
}

exports.Subscription = Subscription;
exports.validateSubscription = validateSubscription;





