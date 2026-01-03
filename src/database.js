require("dotenv").config();
const mongoose = require("mongoose");
const database = async () => {
  await mongoose.connect(process.env.API_KEY);
};
module.exports = database();
