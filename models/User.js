const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true },
  profileImg: {
    type: String,
    default: "https://cdn.dribbble.com/users/60266/screenshots/4544827/stickermule_major_league_hacker.jpg"
  },
  password: { type: String, required: true },
  lastName: String,
  firstName: String,
  phoneNumber: String,
  graduationYear : Number, 
  location: {
    type: String,
    enum: ["Paris", "Madrid"]
  },
  type : {
    type: String,
    enum: ["Web Dev", "UI/UX", "Data Analyse", "Cyber Security"]
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
