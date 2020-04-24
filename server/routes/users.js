const express = require('express');
const router = express.Router();
const guests = require("../models/guests");
const bodyParser = require('body-parser');

const { checkPlusOne } = require('../controllers/users.controller');

router.use(bodyParser.urlencoded({ extended: true }));
const jsonParser = bodyParser.json();


router.get('/api/guests', async (req, res) => {
    try {
        const guestList = await guests.find({});
        res.status(200).send(guestList).end();
    } catch (error) {
        res.status(500).send('Database error').end();
    }
});

router.post('/api/guests/check', jsonParser, async (req, res) => {
    try {
        const guestName = req.body.name;
        const guestList = await guests.find({});
        let found;
        guestList.find(guest => {
            if (guest["name"].toLowerCase() === guestName.toLowerCase()) {
                found = true;
                res.status(200).send(guest).end();
            }
        });
        !found &&
            res.status(404).send('Guest not found!').end();
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal error').end()
    }
});

router.put('/api/guests/edit', jsonParser, async (req, res) => {
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