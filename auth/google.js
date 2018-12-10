const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { User } = require('../database/mongodb');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'https://coverme.vikramraja.me/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value;
      User.findOne({ email }, (err, user) => {
        if (err) {
          done(err);
          return;
        }
        if (user) {
          // If user with email exists but hasn't connected their google account
          if (user.googleId !== profile.id) {
            User.update({ email }, { $set: { googleId: profile.id } })
              .then((savedUser) => {
                done(null, savedUser);
              })
              .catch(err2 => console.err(err2));
          }
          done(null, user);
          return;
        }
        // Create user if doesn't exist
        const newUser = new User();
        newUser.googleId = profile.id;
        newUser.email = email;
        newUser
          .save()
          .then((savedUser) => {
            done(null, savedUser);
          })
          .catch(err2 => console.err(err2)); // eslint-disable-line no-console
      });
    },
  ),
);
