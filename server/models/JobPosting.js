const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const jobpostingSchema = new Schema({
  description: {
    type: String,
    required: 'You need to add a description!',
    minlength: 1,
    maxlength: 2000,
    trim: true,
  },
  title: {
    type: String,
    required: 'You need to add a title!',
    minlength: 1,
    maxlength: 50,
    trim: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const JobPosting = model('JobPosting', jobpostingSchema);

module.exports = JobPosting;
