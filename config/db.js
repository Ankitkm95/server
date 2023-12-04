const mongoose = require("mongoose");
require('dotenv').config();

const connectiontodb = mongoose.connect(process.env.MONGODBURL);

module.exports = {
    connectiontodb
}