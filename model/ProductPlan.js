const mongoose = require('mongoose');
const Joi = require('joi');

const productPlanSchema = new mongoose.Schema({
    id: Number,
    title: String,
    price: String,
    features: [String]
});

const ProductPlan = mongoose.model('ProductPlan', productPlanSchema);

function validateProductPlan(productPlan) {
    const schema = {
        id: Joi.number().integer().required(),
        title: Joi.string().min(3).required(),
        price: Joi.string().required(),
        features: Joi.array().items(Joi.string()).required()
    };
    return Joi.validate(productPlan, schema);
}

exports.ProductPlan = ProductPlan;
exports.validateProductPlan = validateProductPlan;
