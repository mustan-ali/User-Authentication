const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const validator = require('validator');


const loginUser = async (req, res) => {
    res.json({ message: 'Login user' });
}


const registerUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password required' });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long and contain at least 1 lowercase, 1 uppercase, 1 number and 1 symbol' });
        }

        const exists = await User.findOne({ email });

        if (exists) {
            res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await User.create({ email, password: hash });

        res.json({ message: 'User registered', user });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = { loginUser, registerUser };