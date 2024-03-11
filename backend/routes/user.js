const express = require('express');
const router = express.Router();
const { loginUser, registerUser, verifyToken } = require('../controllers/userController');


router.post('/login', loginUser);

router.post('/register', registerUser);

router.post('/verify', verifyToken);

module.exports = router;