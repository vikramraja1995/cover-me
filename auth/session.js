const passport = require('passport');
const { User } = require('../database/mongodb');

passport.serializeUser((user, done) => {
  if (user.id) {
    done(null, user.id);
  }
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
