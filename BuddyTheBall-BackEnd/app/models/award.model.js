const mongoose = require("mongoose");

const Award = mongoose.model(
    'Award',
    new mongoose.Schema({
        name: String,
        photo_id: String,
        fieldname: String,
        originalname: String,
        encoding: String,
        mimetype: String,
        destination: String,
        filename: String,
        path: String,
        size: String,
        upload_date: String
    })
);

module.exports = Award;