require('dotenv/config');
const mongoose = require('mongoose');
const User = require('../models/User');


const newUsers = [
    {
        email:,
        profileImg:,
        password:,
        lastName:,
        firstName:,
        phoneNumber:,
        cohort:,
        type:
    },
    {
        email:,
        profileImg:,
        password:,
        lastName:,
        firstName:,
        phoneNumber:,
        cohort:,
        type:
    },
    {
        email:,
        profileImg:,
        password:,
        lastName:,
        firstName:,
        phoneNumber:,
        cohort:,
        type:
    },
    {
        email:,
        profileImg:,
        password:,
        lastName:,
        firstName:,
        phoneNumber:,
        cohort:,
        type:
    },
    {
        email:,
        profileImg:,
        password:,
        lastName:,
        firstName:,
        phoneNumber:,
        cohort:,
        type:
    },
    {
        email:,
        profileImg:,
        password:,
        lastName:,
        firstName:,
        phoneNumber:,
        cohort:,
        type:
    },
    {
        email:,
        profileImg:,
        password:,
        lastName:,
        firstName:,
        phoneNumber:,
        cohort:,
        type:
    },
]

connection()

async function connection() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    let users = await User.deleteMany();
    console.log(`Deleted ${users.length} Users`)

    users = await User.create(newUsers);
    console.log('Users created: ', users);
    mongoose.connection.close();
    console.log('connection closed.')
  } catch (e) {
    console.error(e);
  }
}
