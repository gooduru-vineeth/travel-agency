const process = require("process");

module.exports = {
  mongoDB: {
    uri: process.env.MONGODB_URI || "mongodb://localhost:27017",
  },
  app: {
    port: process.env.PORT || 3000,
  },
};
