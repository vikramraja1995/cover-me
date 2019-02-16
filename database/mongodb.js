const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
/* --------------------------------------------------------------------------------------------- */
const saltRounds = 8; // Set the bcrypt work factor

// Set up Mongoose Connection
mongoose.connect(
  `mongodb://${process.env.MONGO_IP}/cover-me`,
  { useNewUrlParser: true },
);
const db = mongoose.connection;
mongoose.Promise = Promise;
db.on('error', e => console.error('Connection Error:', e)); // eslint-disable-line no-console
/* --------------------------------------------------------------------------------------------- */

// Set up Schemas
const optionsFormat = { type: Map, of: String };

const coverLetterSchema = new mongoose.Schema({
  templateId: String,
  savedOptions: optionsFormat,
  dateCreated: Date,
  dateModified: Date,
});

const templateSchema = new mongoose.Schema({
  name: String,
  template: String,
  availableOptions: optionsFormat,
  dateCreated: Date,
  dateModified: Date,
});

const userSchema = new mongoose.Schema(
  {
    name: String,
    username: String,
    email: String,
    password: String,
    coverLetters: [coverLetterSchema],
    templates: [templateSchema],
  },
  { strict: false },
);

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
const CoverLetter = mongoose.model('coverLetter', coverLetterSchema);
/* --------------------------------------------------------------------------------------------- */

// DB Querying Functions
// Add a generated cover letter options to user's history
const addCoverLetter = (username, data) => {
  const coverLetter = new CoverLetter(data);
  const now = Date.now();
  coverLetter.dateCreated = now;
  coverLetter.dateModified = now;
  return User.findOneAndUpdate({ username }, { $push: { coverLetter } });
};

// TODO: getCoverLetter() should get the saved cover letter options,
// the template, fill out the information, and return all the data.

// Get the options of a previously generated cover letter, and it's template
const getCoverLetter = (username, coverLetter) => {
  User.findOne({ 'coverLetters.name': coverLetter }).where({ username });
};

// Get a list of cover letters based on the company name
const getCoverLetterList = username => User.find({ username }, 'coverLetters.name');

// TODO: Fix this function
const addUser = (name, username) => {
  const user = new User({
    name,
    username,
  });
  return user.save();
};

// Get a list of available templates for a user
const getTemplateList = username => User.findOne({ username }).then((res) => {
  const templates = res.templates.map(template => ({
    name: template.name,
    templateId: template.id,
  }));
  return templates;
});

// Get available options for a given template belonging to a user
const getTemplateOptions = (username, templateId) => User.findOne({ username })
  .then(user => user.templates.findById(templateId))
  .then(template => template.availableOptions);

// Add a new template to the user's document
const addTemplate = (username, data) => {
  const template = new Template(data);
  const now = Date.now();
  template.dateCreated = now;
  template.dateModified = now;
  return User.findOneAndUpdate({ username }, { $push: { template } });
};

/* --------------------------------------------------------------------------------------------- */

// Exports
module.exports = {
  addCoverLetter,
  getCoverLetterList,
  getCoverLetter,
  addUser,
  getTemplateList,
  getTemplateOptions,
  addTemplate,
  User,
  db,
};
