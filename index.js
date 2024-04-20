// import modules
const express = require("express");
const mongodb = require("./connections/mongoDB");
const routes = require("./routes/index");
const config = require("./config");

// initializations
const app = express();
mongodb.connectToMongoDB();
const port = config.app.port;

app.use(express.json());

app.use("/", routes);

app.listen(port, () => {
  console.log(` app listening on port ${port}`);
});
