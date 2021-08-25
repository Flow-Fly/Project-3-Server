const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true },
  profileImg: {
    type: String,
    default:
      'https://cdn.dribbble.com/users/60266/screenshots/4544827/stickermule_major_league_hacker.jpg',
  },
  password: String,
  lastName: String,
  firstName: String,
  phoneNumber: String,
  graduationYear: Number,
  location: {
    type: String,
    enum: [
      'Paris',
      'Madrid',
      'Amsterdam',
      'Barcelona',
      'Berlin',
      'Miami',
      'Sao Paulo',
      'Lisbon',
      'Mexico City',
    ],
  },
  type: {
    type: String,
    enum: ['Web Dev', 'UI/UX', 'Data Analyst', 'Cyber Security'],
  },
  googleId: String,
  githubId: String,
  favouritePosts:[{
    type: Schema.Types.ObjectId,
    ref: "Article",
    unique:true,
  }],
  favouriteJobs:[{
    type: Schema.Types.ObjectId,
    ref: "Job",
    unique:true,
  }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
