const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const localStrategy = require('passport-local').Strategy;
const passport = require('passport');

module.exports = () => {
  passport.use(
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });
          const match = bcrypt.compareSync(password, user.password);
          if (!user || !match) {
            return done(null, false, { message: 'Wrong credentials' });
          }
          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
};

passport.serializeUser((user,cb) => {
    cb(null, user.id)
})

passport.deserializeUser( async (id, cb) => {
    try {
      const user = await User.findById(id)
      cb(null, user)
    } catch(error) {
      cb(error)
    }
  })