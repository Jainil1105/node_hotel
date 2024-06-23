const mongoose = require("mongoose");
require('dotenv').config();

// const uri = process.env.MONGO_URL;
const uri = process.env.uri;

mongoose.connect(uri, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("connected to mongodb server");
});
db.on("error", (err) => {
  console.error("connection error in mongodb", err);
});
db.on("disconnected", () => {
  console.log("disconnected to mongodb server");
});

module.exports = db;
