
const mongoose = require('mongoose');
const Joi = require('joi');

const Tutor = mongoose.model('Tutor', new mongoose.Schema({
    name: String,
    subject: String,
    ratings: [Number],
    bio: String,
    availability: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date,
}));

function validateTutor(tutor) {
    const schema = {
        name: Joi.string().min(3).required(),
        subject: Joi.string().min(3).required(),
        bio: Joi.string().required(),
        availability: Joi.string().required(),
    };
    return Joi.validate(tutor, schema);
}

exports.Tutor = Tutor;
exports.validateTutor = validateTutor;
