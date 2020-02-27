const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

app.use(bodyParser.urlencoded({ extended: true }));
const jsonParser = bodyParser.json();

// MongoDB database 
const dataBase = require("./config/keys").mongoURI;
const guests = require("./models/guests");

mongoose.connect(dataBase, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

mongoose.set('useFindAndModify', false);

// Get route
app.get('/api/listGuests', async (req, res) => {
    try {
        const guestList = await guests.find({});
        res.status(200).send(guestList).end();
    } catch (error) {
        res.status(500).send('Database error').end();
    }
});

// Post route
app.post('/api/checkGuests', jsonParser, async (req, res) => {
    console.log(req.body)
    try {
    const guestName = req.body.name;
        const guestList = await guests.find({});
        let found;
        guestList.find(guest => {
            if (guest["name"].toLowerCase() === guestName.toLowerCase()) {
                console.log(guest);
                found = true;
                res.status(200).send(guest).end();
            }
        });
        !found &&
            res.status(404).send('Not found on the guest list!').end();
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal error').end()
    }
});

const checkPlusOne = (requestObject) => {
    if(requestObject.participate === 'no' || requestObject.plusOne === false) {
        console.log('triggered')
        requestObject.plusOne = false;
        requestObject.plusOneName = '';
    }
    return requestObject;
};

// Edit route
app.put('/api/editGuest', jsonParser, async (req, res) => {
    console.log(req.body);
    try {
        await guests.findByIdAndUpdate(req.body._id, checkPlusOne(req.body));
        const guestList = await guests.find({});
        res.status(200).send(guestList).end();
    } catch (error) {
        res.status(500).send('Error updating the data.').end();
        console.log(error);
    }
});

// Server
const PORT = process.env.PORT || 5001;
app.listen(
    PORT, 
    () => console.log(`server is listening on port ${PORT}`)
);