const mongoose = require("mongoose");

const Coach = mongoose.model(
    "Coach",
    new mongoose.Schema({
        coach_name: String,
        territory: String,
        alloted_slot: String,
        alloted_day: String
    })
);

module.exports = Coach;