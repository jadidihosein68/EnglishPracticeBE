const express = require('express');
const router = express.Router();
const { Session, validateSession } = require('../model/Session');

router.get('/', async (req, res) => {
  try {
    const sessions = await Session.find();
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).send('Error retrieving sessions');
  }
});

router.get('/:id', async (req, res) => {
  const sessionId = req.params.id;

  try {
    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).send('Session not found');
    }

    res.status(200).json(session);
  } catch (error) {
    res.status(500).send('Error retrieving session');
  }
});

router.post('/', async (req, res) => {
  const { error } = validateSession(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let session = new Session(req.body);
  try {
    session = await session.save();
    res.status(200).send(session);
  } catch (ex) {
    res.status(500).send('Error saving session');
  }
});

router.put('/:id', async (req, res) => {
  const { error } = validateSession(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const session = await Session.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!session) return res.status(404).send('Session with the given ID was not found.');

    res.status(200).send(session);
  } catch (ex) {
    res.status(500).send('Error updating session');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const session = await Session.findByIdAndRemove(req.params.id);
    if (!session) return res.status(404).send('Session with the given ID was not found.');

    res.status(200).send(session);
  } catch (ex) {
    res.status(500).send('Error deleting session');
  }
});

module.exports = router;
