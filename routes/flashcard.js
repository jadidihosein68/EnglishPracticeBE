const express = require("express");
const router = express.Router();
const fs = require('fs');

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





  router.post('/:id/flashcards', async (req, res) => {
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










  module.exports = router;