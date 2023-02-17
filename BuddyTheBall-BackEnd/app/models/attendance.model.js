const mongoose = require("mongoose");

const Attendance = mongoose.model(
    "Attendance",
    new mongoose.Schema({
        coach_id: String,
        school_id: String,
        customer_id: String,
        customer: String,
        time_period: Object,
        attendance_date: String,
        attendance: { type: String, default: 'NA' },
        start_date: String,
        end_data: String,
        time: { type: Date, default: Date.now }
    })
);

module.exports = Attendance;