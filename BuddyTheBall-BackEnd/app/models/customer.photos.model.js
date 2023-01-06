const mongoose = require("mongoose");

const CustomerPhotos = mongoose.model(
    "CustomerPhotos",
    new mongoose.Schema({
        customer_id: String,
        school_id: String,
        coach_id: String,
        photo_id: String,
        fieldname: String,
        originalname: String,
        encoding: String,
        mimetype: String,
        destination: String,
        filename: String,
        path: String,
        size: String,
        upload_date: String,
        messages: [{ messanger_id: String, message: String, time: String, messanger_name: String }]
    })
);

module.exports = CustomerPhotos;