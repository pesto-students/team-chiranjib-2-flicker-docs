// import dotenv from 'dotenv';
// dotenv.config();
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import { User } from './models/userModel';

passport.use(
  new GoogleStrategy(
    {
      clientID: '244593955079-cauv4gaj7co1cfa2len0ted4micpkjd4.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: '/auth/google/callback',
      scope: ['profile', 'email'],
    },
    async function (accessToken, refreshToken, profile, callback) {
      try {
        const existingUser = await User.findOne({ id: profile.id });

        if (existingUser) {
          return callback(null, profile);
        }

        console.log('Creating new user...');
        const newUser = new User({
          id: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          picture: profile.photos[0].value,
        });
        await newUser.save();
        return callback(null, profile);
      } catch (error) {
        return callback(error, false);
      }

      // callback(null, profile);
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
