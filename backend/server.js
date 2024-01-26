const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const userRoutes = require('./routes/user');
const PORT = process.env.PORT;


app.use(express.json());
app.use(userRoutes);


mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to database');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log('Error connecting to database', error.message);
    });