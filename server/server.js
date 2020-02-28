const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env'});

// MongoDB database 
const dataBase = require("./config/keys").mongoURI;

mongoose.connect(dataBase, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

mongoose.set('useFindAndModify', false);

// Routes
const users = require('./routes/users');
app.use('/', users);

// Server
const PORT = process.env.PORT || 5000;
app.listen(
    PORT,
    () => console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);