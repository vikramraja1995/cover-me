const mongoose = require('mongoose');
const envVars = require('../env_variables');
/* --------------------------------------------------------------------------------------------- */

// Set up Mongoose Connection
mongoose.connect(
  envVars.mongoIP,
  { useNewUrlParser: true }
);
const db = mongoose.connection;
mongoose.Promise = Promise;
db.on('error', () => console.error('Connection Error:'));
/* --------------------------------------------------------------------------------------------- */

// Set up Schemas

const coverLetterSchema = new mongoose.Schema({
  letter: String
});

const userSchema = new mongoose.Schema(
  {
    name: String,
    username: String,
    coverLetters: [new mongoose.Schema.Types.Mixed()]
  },
  { strict: false }
);

const templateSchema = new mongoose.Schema.Types.Mixed();

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
  return user.save(); // catch error
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
  getTemplate
};
