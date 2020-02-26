const mongoose = require("mongoose");

const guestsSchema = new mongoose.Schema({
    name: String,
    participate: String,
    plusOne: Boolean,
    plusOneName: String,
    created: {
        type: Date,
        default: Date.now
    }
});

const guests = mongoose.model("guests", guestsSchema);

module.exports = guests;