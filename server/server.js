require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const db = require('../database/mongodb');

// Set up Express server and JSON parsing of API requests
const app = express();
// Allow Cross Origin Requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Expose-Headers', 'Content-Length');
  res.header(
    'Access-Control-Allow-Headers',
    'Accept, Authorization, Content-Type, X-Requested-With, Range',
  );
  if (req.method === 'OPTIONS') {
    return res.send(200);
  }
  return next();
});

// Serve up front end files
app.use(express.static('client/dist'));
app.use(bodyParser.json());
app.use(
  session({
    secret: 'cover_me',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: db.db }),
    cookie: {
      secure: false,
      maxAge: 86400000, // 1 day
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());
require('../auth/session');
require('../auth/local');
require('../auth/google');

// Handle Google SSO
app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
  }),
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  },
);

// Handle login requests
app.post('/auth/login', passport.authenticate('local-login'), (req, res) => {
  res.sendStatus(200);
});

app.post('/auth/register', passport.authenticate('local-signup'), (req, res) => {
  res.sendStatus(200);
});

const ensureLoggedIn = () => (req, res, next) => {
  // isAuthenticated is set by `deserializeUser()`
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    res.status(401).send({
      success: false,
      message: 'You need to be authenticated to access this page!',
    });
  } else {
    next();
  }
};

app.get('/auth/check', ensureLoggedIn(), (req, res, next) => {
  res.send({ success: true, message: 'You are authenticated' });
  next();
});

// Get the template from DB, fill it with user data, save the cover letter in the db and return it
app.post('/api/generate', (req, res) => {
  db.getTemplate().then((data) => {
    let { template } = data;
    Object.keys(req.body).forEach((prop) => {
      template = template.replace(`{${prop}}`, req.body[prop]);
    });
    res.send({ letter: template });
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}...`)); // eslint-disable-line no-console
/* --------------------------------------------------------------------------------------------- */
