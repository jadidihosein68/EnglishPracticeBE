const express = require('express');
const router = express.Router();
const { ProductPlan } = require('../model/ProductPlan');

// Get all product plans
router.get('/', async (req, res) => {
  try {
    const productPlans = await ProductPlan.find();
    res.status(200).json(productPlans);
  } catch (error) {
    res.status(500).send('Error retrieving product plans');
  }
});

// Get a product plan by ID
router.get('/:id', async (req, res) => {
  const planId = req.params.id;

  try {
    const productPlan = await ProductPlan.findOne({ id: planId });

    if (!productPlan) {
      return res.status(404).send('Product plan not found');
    }

    res.status(200).json(productPlan);
  } catch (error) {
    res.status(500).send('Error retrieving product plan');
  }
});

module.exports = router;
