const mongoose = require("mongoose");

const Messages = mongoose.model(
    "Messages",
    new mongoose.Schema([{
        messanger_id: String,
        url: String,
        message: String,
        time: { type: Date, default: Date.now },
        messanger_name: String
    }])
);

module.exports = Messages;