const express = require('express');
const router = express.Router();
const guests = require("../models/guests");
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
const jsonParser = bodyParser.json();

router.post('/api/guests/add', jsonParser, async (req, res) => {
    try {
        // avoiding duplicates
        const guestList = await guests.find({});
        let found = false;
        guestList.find(guest => {
            if (guest["name"].toLowerCase() === req.body.name.toLowerCase()) {
                found = true;
            }
        });
        if(found) {
            return res.status(400).send("Guest already exist.").end();
        }
        if(req.body.name.trim().length === 0) {
            return res.status(400).send("Cannot be empty or white space.").end();
        }

        const addGuest = {
            "name": req.body.name.trim(),
            "participate": '',
            "plusOne": false,
            "plusOneName": ''
        }
        const addedGuest = await guests.create(addGuest);
        addedGuest.save();
        res.status(200).send(addedGuest).end();
    } catch (error) {
        res.status(500).send('Error creating data.').end();
        console.log(error);
    }
});

router.delete('/api/guests/remove', jsonParser, async (req, res) => {
    try {
        const guestName = req.body.name;
        const guestList = await guests.find({});
        let found;
        guestList.map(async guest => {
            if (guest["name"].toLowerCase() === guestName.toLowerCase()) {
                found = true;
                const deletedGuest = await guests.findByIdAndDelete(guest);
                res.status(200).send(deletedGuest).end();
            }
        });
        !found &&
            res.status(404).send('Not found on the guest list!').end();
    } catch (error) {
        res.status(500).send('Error creating data.').end();
        console.log(error);
    }
});

module.exports = router;