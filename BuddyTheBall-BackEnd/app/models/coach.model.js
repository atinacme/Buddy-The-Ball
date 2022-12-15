const mongoose = require("mongoose");

const Coach = mongoose.model(
    "Coach",
    new mongoose.Schema({
        coach_id: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role"
            }
        ]
    })
);

module.exports = Coach;