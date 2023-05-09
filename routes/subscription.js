const express = require('express');
const router = express.Router();
const { Subscription, validateSubscription } = require('../model/Subscription');

router.get('/', async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).send('Error retrieving subscriptions');
  }
});

router.get('/:id', async (req, res) => {
  const subscriptionId = req.params.id;

  try {
    const subscription = await Subscription.findById(subscriptionId);

    if (!subscription) {
      return res.status(404).send('Subscription not found');
    }

    res.status(200).json(subscription);
  } catch (error) {
    res.status(500).send('Error retrieving subscription');
  }
});

router.post('/', async (req, res) => {
  const { error } = validateSubscription(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let subscription = new Subscription(req.body);
  try {
    subscription = await subscription.save();
    res.status(200).send(subscription);
  } catch (ex) {
    res.status(500).send('Error saving subscription');
  }
});

router.put('/:id', async (req, res) => {
  const { error } = validateSubscription(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const subscription = await Subscription.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!subscription) return res.status(404).send('Subscription with the given ID was not found.');

    res.status(200).send(subscription);
  } catch (ex) {
    res.status(500).send('Error updating subscription');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const subscription = await Subscription.findByIdAndRemove(req.params.id);
    if (!subscription) return res.status(404).send('Subscription with the given ID was not found.');

    res.status(200).send(subscription);
  } catch (ex) {
    res.status(500).send('Error deleting subscription');
  }
});

module.exports = router;
