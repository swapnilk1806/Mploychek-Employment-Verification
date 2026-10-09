const mongoose = require("mongoose");

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mploychek";

async function connectDatabase() {
  await mongoose.connect(MONGO_URI);
  console.log("MongoDB: Connected");
}

module.exports = { connectDatabase, MONGO_URI };