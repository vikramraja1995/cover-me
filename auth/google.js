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
      console.log(profile);
      console.log(profile.emails, profile.email);
      // User.findOrCreate({ googleId: profile.id }, (err, user) => done(err, user));
      User.findOne({ email: profile.email }, (err, user) => {
        if (err) {
          done(err);
          return;
        }
        if (user) {
          // If user with email exists but hasn't connected their google account
          if (user.googleId !== profile.id) {
            User.update(user, { $set: { googleId: profile.id } })
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
        newUser.email = profile.email;
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
