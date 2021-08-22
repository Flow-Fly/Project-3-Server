const GithubStrategy = require('passport-github-oauth20').Strategy;
const User = require('../../models/User');
const passport = require('passport');

module.exports = () => {
  passport.use(
    new GithubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_AUTH_CALLBACK,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await User.findOne({ githubId: profile.id });
          if (user) {
            done(null, user);
            return;
          }
          
  const email = profile.emails[0]?.value || 'no email'
  const firstName = profile.username
  const profileImg = profile.photos[0]?.value
  const githubId = profile.id
    
          await User.create({
            email,
            firstName,
            profileImg,
            githubId
          })
        
          done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
};
