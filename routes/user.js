const authmiddleware = require('../middleware/auth');
const mongoose = require('mongoose');
const { User } = require('../model/user');

const express = require('express');
const router = express.Router();


router.get('/getmyprofile', authmiddleware, async (req, res) => {
    const userId = req.user._id;    
    try {
        const user = await User.findById(userId).select('name email nickname bio -_id'); // Only include name and email in the result
        if (!user) return res.status(404).send('User with the given ID was not found.');
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
});

router.put('/updateprofile', authmiddleware, async (req, res) => {
    const userId = req.user._id;

    const bio = req.body.bio; // This should be provided in the request body
    const nickname = req.body.nickname; // This should be provided in the request body

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).send('User with the given ID was not found.');

        // If the bio or nickname fields are provided in the request body, update them in the user document
        if (bio !== undefined) user.bio = bio;
        if (nickname !== undefined) user.nickname = nickname;

        await user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error });
    }
});






module.exports = router;
