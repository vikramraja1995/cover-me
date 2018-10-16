const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const envVars = require('../env_variables');
/* --------------------------------------------------------------------------------------------- */
const saltRounds = 8; // Set the bcrypt work factor

// Set up Mongoose Connection
mongoose.connect(
  `mongodb://${envVars.mongoIP}/cover-me`,
  { useNewUrlParser: true }
);
const db = mongoose.connection;
mongoose.Promise = Promise;
db.on('error', e => console.error('Connection Error:', e));
/* --------------------------------------------------------------------------------------------- */

// Set up Schemas

const coverLetterSchema = new mongoose.Schema({
  letter: String
});

const userSchema = new mongoose.Schema(
  {
    name: String,
    username: String,
    email: String,
    password: String,
    coverLetters: [mongoose.Schema.Types.Mixed]
  },
  { strict: false }
);

const templateSchema = new mongoose.Schema({
  name: String,
  template: String
});
/* --------------------------------------------------------------------------------------------- */

// Set up password hashing and comparing functions
userSchema.methods.generateHash = (password, callback) => {
  bcrypt.hash(password, saltRounds, callback);
};

userSchema.methods.validatePassword = (password, hash, callback) => {
  bcrypt.compare(password, hash, callback);
};
/* --------------------------------------------------------------------------------------------- */

// Set up Models
const User = mongoose.model('user', userSchema);
const Template = mongoose.model('template', templateSchema);
/* --------------------------------------------------------------------------------------------- */

// DB Querying Functions
const addCoverLetter = (username, coverLetter) =>
  User.findOne({ username }).then(doc => {
    doc.coverLetters.push(coverLetter);
  });

const getCoverLetter = (username, coverLetter) =>
  User.findOne({ 'coverLetters.name': coverLetter }).where({ username });

const getCoverLetterList = username => User.find({ username }, 'coverLetters.name');

const addUser = (name, username) => {
  const user = new User({
    name,
    username
  });
  return user.save();
};

const addFieldToUser = (username, field, value) => {};

const removeFieldFromUser = (username, field, value) => {};

const getTemplate = () => Template.findOne({});
/* --------------------------------------------------------------------------------------------- */

// Exports
module.exports = {
  addCoverLetter,
  getCoverLetterList,
  getCoverLetter,
  addUser,
  getTemplate,
  User
};
