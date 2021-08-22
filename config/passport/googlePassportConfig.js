const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../../models/User');
const passport = require('passport');

module.exports = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_AUTH_CALLBACK,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await User.findOne({ googleId: profile.id });
          if (user) {
            done(null, user);
            return;
          }
          
          const newUser = {
            email: profile.emails[0].value,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            profileImg: profile.picture,
            googleId: profile.id
          }
          await User.create(newUser)
         
          done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
};
