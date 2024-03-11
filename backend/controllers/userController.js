const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');


const generateToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '1h' });
}


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password required' });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user._id);

        return res.json({ message: 'User Logged In', email: user.email, token });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
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
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await User.create({ email, password: hash });

        const token = generateToken(user._id);

        return res.json({ message: 'User Registered', email: user.email, token });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const verifyToken = async (req, res) => {
    try {
        const token = req.body.token;

        if (!token) {
            return res.status(400).json({ message: 'Token required' });
        }

        await jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                return res.status(400).json({ message: 'Invalid token' });
            }

            return res.status(200).json({ message: 'Token verified', email: decoded.email });
        }
        );
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = { loginUser, registerUser, verifyToken };