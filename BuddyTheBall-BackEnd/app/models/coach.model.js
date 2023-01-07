const mongoose = require("mongoose");

const Coach = mongoose.model(
    "Coach",
    new mongoose.Schema({
        user_id: String,
        email: String,
        password: String,
        coach_name: String,
        tennis_club: String,
        assigned_territory: String,
        assigned_schools: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "School"
            }
        ],
        favorite_pro_player: String,
        handed: String,
        favorite_drill: String,
    })
);

module.exports = Coach;