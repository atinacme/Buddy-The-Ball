const mongoose = require("mongoose");

const Coach = mongoose.model(
    "Coach",
    new mongoose.Schema({
        user_id: String,
        email: String,
        password: String,
        coach_name: String,
        tennis_club: String,
        assigned_region: String,
        assigned_schools: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "School"
            }
        ],
        assign_slot: Array,
        favorite_pro_player: String,
        handed: String,
        favorite_drill: String,
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

module.exports = Coach;