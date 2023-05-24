const express = require("express");
const router = express.Router();
const fs = require('fs');
const { validateFlashcard } = require('../model/Flashcard');

const { FlashcardSet, validateFlashcardSet } = require('../model/FlashcardSet');


router.get('/', (req, res) => {
    fs.readFile('vocabulary.txt', 'utf8', (err, data) => {
      if (err) {
        res.status(500).json({ message: 'Error reading the vocabulary file.' });
      } else {
        try {
          const vocabulary = JSON.parse(data);
          res.status(200).json(vocabulary);
        } catch (error) {
          res.status(500).json({ message: 'Error parsing the vocabulary file.' });
        }
      }
    });
  });





  router.post('/flashcardset/:id', async (req, res) => {
    // First, validate the incoming flashcard data
    const { error } = validateFlashcard(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Fetch the flashcard set
    const flashcardSet = await FlashcardSet.findById(req.params.id);
    if (!flashcardSet) return res.status(404).send('FlashcardSet with the given ID was not found.');

    // Add the new flashcard to the flashcards array
    flashcardSet.flashcards.push(req.body);

    // Save the updated flashcard set
    await flashcardSet.save();

    // Send the updated flashcard set as the response
    res.send(flashcardSet);
});



router.put('/flashcardset/:setId/:flashcardId', async (req, res) => {
  // First, validate the incoming flashcard data
  const { error } = validateFlashcard(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Fetch the flashcard set
  const flashcardSet = await FlashcardSet.findById(req.params.setId);
  if (!flashcardSet) return res.status(404).send('FlashcardSet with the given ID was not found.');

  // Find the specific flashcard in the set
  const flashcard = flashcardSet.flashcards.id(req.params.flashcardId);
  if (!flashcard) return res.status(404).send('Flashcard with the given ID was not found.');

  // Update the flashcard data
  flashcard.front = req.body.front;
  flashcard.back = req.body.back;
  // repeat for other flashcard fields as necessary

  // Save the updated flashcard set
  await flashcardSet.save();

  // Send the updated flashcard set as the response
  res.send(flashcardSet);
});







  module.exports = router;