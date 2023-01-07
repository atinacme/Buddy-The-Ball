const mongoose = require("mongoose");

const Customer = mongoose.model(
    "Customer",
    new mongoose.Schema({
        user_id: String,
        email: String,
        password: String,
        parent_name: String,
        player_name: String,
        player_age: String,
        wristband_level: String,
        handed: String,
        num_buddy_books_read: String,
        jersey_size: String,
        school: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "School"
        },
        coach: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Coach"
        },
        current_award: String
    })
);

module.exports = Customer;