const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    console.log("MongoDb connected successfully");
  } catch (error) {
    console.error("error connecting to MongoDB", error);
  }
}

module.exports = connectDB;
