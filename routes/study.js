const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const authmiddleware = require("../middleware/auth");
const {User} = require('../model/user');

const { FlashcardSet, validateFlashcardSet } = require('../model/FlashcardSet');

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



module.exports = router;
