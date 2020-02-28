const express = require('express');
const router = express.Router();
const guests = require("../models/guests");
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
const jsonParser = bodyParser.json();

const checkPlusOne = (requestObject) => {
    if (requestObject.participate === 'no' || requestObject.plusOne === false) {
        console.log('triggered')
        requestObject.plusOne = false;
        requestObject.plusOneName = '';
    }
    return requestObject;
};

router.get('/api/listGuests', async (req, res) => {
    try {
        const guestList = await guests.find({});
        res.status(200).send(guestList).end();
    } catch (error) {
        res.status(500).send('Database error').end();
    }
});

router.post('/api/checkGuests', jsonParser, async (req, res) => {
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

router.put('/api/editGuest', jsonParser, async (req, res) => {
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

module.exports = router;