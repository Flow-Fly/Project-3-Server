const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true },
  profileImg: String,
  password: { type: String, required: true },
  lastName: String,
  firstName: String,
  phoneNumber: String,
  cohort : String,
  type : {
    type: String,
    enum: ["Web Dev", "UI/UX", "Data Analyse", "Cyber Security"]
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
