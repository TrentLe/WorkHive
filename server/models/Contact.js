const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  message: {
    type: String,
    minlength: 20,
    maxlength: 1000,
  },
});

const Contact = model('Contact', contactSchema);

module.exports = Contact;
