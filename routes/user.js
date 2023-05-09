const authmiddleware = require('../middleware/auth');
const mongoose = require('mongoose');
const { User } = require('../model/user');

const express = require('express');
const router = express.Router();

/*
router.get('/', authmiddleware, async (req, res) => {
    try {
        const users = await User.find().select('-googleToken'); // Exclude googleToken from the result
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});
*/

router.get('/getmyprofile', authmiddleware, async (req, res) => {
    const userId = req.user._id;    
    try {
        const user = await User.findById(userId).select('name email -_id'); // Only include name and email in the result
        if (!user) return res.status(404).send('User with the given ID was not found.');
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
});


module.exports = router;
