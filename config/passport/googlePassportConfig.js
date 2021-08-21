const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../../models/User');
const passport = require('passport');

module.exports = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:4000/auth/google/callback',
        passReqToCallback: true,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await User.findOne({ googleId: profile.id });
          if (user) {
            done(null, user);
            return;
          }
          console.log(profile)
        //   const email = profile.emails[0].value;
        //   const name = profile.displayName;
        //   const newUser = await User.create({
        //     email,
        //     name,
        //     googleId: profile.id,
        //   });
          done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
};
