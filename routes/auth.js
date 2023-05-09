
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const { OAuth2Client } = require('google-auth-library');
const { User } = require('../model/user');
const CLIENT_ID = config.get('Google_CLIENT_ID');
const client = new OAuth2Client(CLIENT_ID);

function jwtGenerator(user) {
    const payload = {
      _id: user._id,
      name: user.name,
      email: user.email,
      // Add any other user information you'd like to include in the token
    };
  
    const token = jwt.sign(payload, config.get('jwtPrivateKey'), { expiresIn: '1h' });
    return token;
}

router.post('/', async (req, res) => {
    const credential = req.body.credential;
   
    try {
      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: CLIENT_ID,
      });
  
      const payload = ticket.getPayload();
  
      let user = await User.findOne({ googleId: payload.sub });
  
      if (!user) {
        user = new User({
          name: payload.name,
          email: payload.email,
          googleId: payload.sub,
          // Add any other user information you'd like to store
        });
        await user.save();
      }
  
      const token = jwtGenerator(user);
      res.status(200).json({ token });
    } catch (error) {
      res.status(400).send('Bad Request: ' + error);
    }
});

module.exports = router;
