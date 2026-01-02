const mongoose = require("mongoose");
const database = async () => {
  await mongoose.connect(
    "mongodb+srv://shashank:shashank1947@cluster0.muc28sl.mongodb.net/date_app"
  );
};
module.exports = database();
