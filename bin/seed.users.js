require('dotenv/config');
const mongoose = require('mongoose');
const User = require('../models/User');
import bcrypt from 'bcrypt'

const password = '1234'
const safePass = bcrypt.hashSync(password)





const newUsers = [
  {
      email:'johndoe@mail.com',
      password: safePass,
      lastName:'john',
      firstName:'doe',
      phoneNumber:'00112233',
      graduationYear: '1912',
      location: 'Paris',
      type: 'Web Dev'
  },
  {
      email:'alicedoe@mail.com',
      password: safePass,
      lastName:'alice',
      firstName:'doe',
      phoneNumber:'001122334455',
      graduationYear: '2004',
      location: 'Madrid',
      type: 'UI/UX'
  },
  {
      email:'billgates@mail.com',
      password: safePass,
      lastName:'bill',
      firstName:'gates',
      phoneNumber:'0111111111',
      graduationYear: '1969',
      location: 'Paris',
      type: 'Data Analyst'
  },
  {
      email:'stevejobs@mail.com',
      password: safePass,
      lastName:'steve',
      firstName:'jobs',
      phoneNumber:'0222222222',
      graduationYear: '2000',
      location: 'MAdrid',
      type: 'Cyber Security'
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
