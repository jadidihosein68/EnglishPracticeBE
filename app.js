const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();

const allowedOrigins = ['http://localhost:4200'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.get('/getvocabulary', (req, res) => {
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


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


 // endpoint http://localhost:3000/getvocabulary