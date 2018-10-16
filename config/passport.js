const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../database/mongodb');

passport.use(
  'local-login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    (email, password, done) => {
      User.findOne({ email }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: 'Incorrect email' });
        }
        user.validatePassword(password, user.password, (error, res) => {
          if (error) {
            return done(error);
          }
          if (res === true) {
            return done(null, user);
          }
          return done(null, false, { message: 'Incorrect password' });
        });
      });
    }
  )
);

passport.use(
  'local-signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    (email, password, done) => {
      User.findOne({ email }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, false, { message: 'User with that email already exists!' });
        }
        const newUser = new User();
        newUser.email = email;
        newUser.generateHash(password, (err1, res) => {
          if (err1) {
            throw new Error(err1);
          }
          newUser.password = res;
          newUser
            .save()
            .then(savedUser => {
              done(null, savedUser);
            })
            .catch(err2 => console.err(err2));
        });
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
