const mongoose = require("mongoose");
const config = require("../config");

exports.connectToMongoDB = () => mongoose.connect(config.mongoDB.uri);
