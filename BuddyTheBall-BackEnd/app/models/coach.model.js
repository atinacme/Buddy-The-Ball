const mongoose = require("mongoose");

const Coach = mongoose.model(
    "Coach",
    new mongoose.Schema({
        coach_name: String,
        territory: String
    })
);

module.exports = Coach;