const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const authmiddleware = require("../middleware/auth");
const {User} = require('../model/user');



const { FlashcardSet, validateFlashcardSet } = require('../model/FlashcardSet');

router.get('/workshop',authmiddleware, async (req, res) => {
  try {
    let user = await User.findById(req.user._id)
    .populate('coCreatedflashcardsets').populate('createdFlashCardSets');
    let allFlashcardSets = [...user.coCreatedflashcardsets, ...user.createdFlashCardSets];
    if (!user) return res.status(404).send('User not found');   
    res.status(200).json(allFlashcardSets);
  } catch (ex) {
    console.error(ex);
    res.status(500).send('Error retrieving flashcard sets');
  }
});


router.get('/publishedlist', async (req, res) => {
  try {
    const flashcardSets = await FlashcardSet.find({ status: 'Published' });
    res.status(200).json(flashcardSets);
  }catch (error) {
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

router.post('/',authmiddleware, async (req, res) => {

  const { error } = validateFlashcardSet(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let flashcardSet = new FlashcardSet(req.body);
  flashcardSet.author = req.user._id;

  try {


    flashcardSet = await flashcardSet.save();
    let creator = await User.findById(flashcardSet.author);
    creator.createdFlashCardSets.push(flashcardSet._id);
    await creator.save();



    res.status(200).send(flashcardSet);
  } catch (ex) {

    console.log({ex});
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



router.put('/publish/:id', async (req, res) => {
  try {
    // Find the flashcard set and update the status field
    const flashcardSet = await FlashcardSet.findByIdAndUpdate(
      req.params.id, 
      { status: 'Published' }, 
      { new: true }
    );

    // Check if the flashcard set was found and updated
    if (!flashcardSet) return res.status(404).send('Flashcard set with the given ID was not found.');

    res.status(200).send(flashcardSet);
  } catch (ex) {
    res.status(500).send('Error publishing flashcard set');
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
