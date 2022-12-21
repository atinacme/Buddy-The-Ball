const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.school = require("./school.model");
db.coach = require("./coach.model");
db.customer = require("./customer.model");
db.dbConfig = require("../config/db.config.js");
db.ROLES = ["customer", "superadmin", "coach"];

module.exports = db;