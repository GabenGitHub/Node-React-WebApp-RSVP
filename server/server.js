const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env'});
// app.use(bodyParser.urlencoded({ extended: true }));

// Importing routes
const users = require('./routes/users');

// MongoDB database 
const dataBase = require("./config/keys").mongoURI;
mongoose.set('useFindAndModify', false);

mongoose.connect(dataBase, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

// Routes
app.use('/', users);

// Server
const PORT = process.env.PORT || 5000;
app.listen(
    PORT,
    () => console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);