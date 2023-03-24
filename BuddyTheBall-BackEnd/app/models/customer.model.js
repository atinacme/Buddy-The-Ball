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
        attendance: Array,
        total_absent: String,
        total_present: String,
        created_by: String,
        current_award: Object,
        profile_data: {
            photo_id: String,
            fieldname: String,
            originalname: String,
            encoding: String,
            mimetype: String,
            filename: String,
            size: String,
            url: String,
            upload_date: { type: Date, default: Date.now },
        }
    })
);

module.exports = Customer;