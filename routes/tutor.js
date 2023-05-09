
const express = require('express');
const router = express.Router();
const { Tutor, validateTutor } = require('../model/Tutor');

router.get('/', async (req, res) => {
  try {
    const tutors = await Tutor.find();
    res.status(200).json(tutors);
  } catch (error) {
    res.status(500).send('Error retrieving tutors');
  }
});

router.get('/:id', async (req, res) => {
  const tutorId = req.params.id;

  try {
    const tutor = await Tutor.findById(tutorId);

    if (!tutor) {
      return res.status(404).send('Tutor not found');
    }

    res.status(200).json(tutor);
  } catch (error) {
    res.status(500).send('Error retrieving tutor');
  }
});

router.post('/', async (req, res) => {
  const { error } = validateTutor(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let tutor = new Tutor(req.body);
  try {
    tutor = await tutor.save();
    res.status(200).send(tutor);
  } catch (ex) {
    res.status(500).send('Error saving tutor');
  }
});

router.put('/:id', async (req, res) => {
  const { error } = validateTutor(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const tutor = await Tutor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tutor) return res.status(404).send('Tutor with the given ID was not found.');

    res.status(200).send(tutor);
  } catch (ex) {
    res.status(500).send('Error updating tutor');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const tutor = await Tutor.findByIdAndRemove(req.params.id);
    if (!tutor) return res.status(404).send('Tutor with the given ID was not found.');

    res.status(200).send(tutor);
  } catch (ex) {
    res.status(500).send('Error deleting tutor');
  }
});

module.exports = router;
