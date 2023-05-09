const mongoose = require('mongoose');
const Joi = require('joi');

const Session = mongoose.model('Session', new mongoose.Schema({
    tutorId: mongoose.Schema.Types.ObjectId,
    userId: mongoose.Schema.Types.ObjectId,
    scheduledTime: Date,
    duration: Number,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date,
}));

function validateSession(session) {
    const schema = {
        tutorId: Joi.string().required(),
        userId: Joi.string().required(),
        scheduledTime: Joi.date().required(),
        duration: Joi.number().required(),
    };
    return Joi.validate(session, schema);
}

exports.Session = Session;
exports.validateSession = validateSession;
