const mongoose = require('mongoose');
const Joi = require('joi');

const Subscription = mongoose.model('Subscription', new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    flashcardSetId: mongoose.Schema.Types.ObjectId,
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: Date,
}));

function validateSubscription(subscription) {
    const schema = {
        userId: Joi.string().required(),
        flashcardSetId: Joi.string().required(),
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
    };
    return Joi.validate(subscription, schema);
}

exports.Subscription = Subscription;
exports.validateSubscription = validateSubscription;
