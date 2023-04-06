const mongoose = require("mongoose");

const Schedule = mongoose.model(
    "Schedule",
    new mongoose.Schema({
        coach_id: String,
        user_id: String,
        date: String,
        start_time: String,
        end_time: String,
        school: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "School"
        },
        topic: String,
        status: { type: String, default: 'Upcoming' },
        time: { type: Date, default: Date.now }
    })
);

module.exports = Schedule;