const mongoose = require("mongoose");

const School = mongoose.model(
    "School",
    new mongoose.Schema({
        school_name: String,
        region: String,
        assigned_day: String,
        customers: Array,
        coaches: Array
    })
);

module.exports = School;