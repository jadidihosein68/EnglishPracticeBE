const express = require('express');
const router = express.Router();


const { FlashcardSet, validateFlashcardSet } = require('../model/FlashcardSet');

router.get('/', async (req, res) => {
  try {
    const flashcardSets = await FlashcardSet.find();
    res.status(200).json(flashcardSets);
  } catch (error) {
    res.status(500).send('Error retrieving flashcard sets');
  }
});

router.get('/:id', async (req, res) => {
  const setId = req.params.id;

  try {
    const flashcardSet = await FlashcardSet.findById(setId);

    if (!flashcardSet) {
      return res.status(404).send('Flashcard set not found');
    }

    res.status(200).json(flashcardSet);
  } catch (error) {
    res.status(500).send('Error retrieving flashcard set');
  }
});

router.post('/', async (req, res) => {
  const { error } = validateFlashcardSet(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let flashcardSet = new FlashcardSet(req.body);
  try {
    flashcardSet = await flashcardSet.save();
    res.status(200).send(flashcardSet);
  } catch (ex) {
    res.status(500).send('Error saving flashcard set');
  }
});

router.put('/:id', async (req, res) => {
  const { error } = validateFlashcardSet(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const flashcardSet = await FlashcardSet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!flashcardSet) return res.status(404).send('Flashcard set with the given ID was not found.');

    res.status(200).send(flashcardSet);
  } catch (ex) {
    res.status(500).send('Error updating flashcard set');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const flashcardSet = await FlashcardSet.findByIdAndRemove(req.params.id);
    if (!flashcardSet) return res.status(404).send('Flashcard set with the given ID was not found.');

    res.status(200).send(flashcardSet);
  } catch (ex) {
    res.status(500).send('Error deleting flashcard set');
  }
});

module.exports = router;
