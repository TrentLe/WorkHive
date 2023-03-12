const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const companySchema = new Schema({
  companyname: {
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
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  bio: {
    type: String,
    minlength: 20,
    maxlength: 1000,
  },
  profilepicture: {
    type: String,
  },
  jobpostings: [
    {
      type: Schema.Types.ObjectId,
      ref: 'JobPosting',
    },
  ],
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    },
  ],
});

companySchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

companySchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Company = model('Company', companySchema);

module.exports = Company;
