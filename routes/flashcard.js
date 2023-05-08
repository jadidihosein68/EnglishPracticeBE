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

  module.exports = router;