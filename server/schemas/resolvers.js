const { AuthenticationError } = require('apollo-server-express');
const { User, JobPosting } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find()
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
    },
    
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('thoughts');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    signup: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    createJobPosting: async (parent, { title, description}, context) => {
      if (context.user) {
        const jobPosting = await JobPosting.create({
          title,
          description,
          Author: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { jobpostings: jobposting._id } }
        );

        return jobPosting;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeJobPosting: async (parent, { jobpostingId }, context) => {
      if (context.user) {
        const jobposting = await JobPosting.findOneAndDelete({
          _id: jobpostingId,
          Author: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { jobpostings: jobposting._id } }
        );

        return jobposting;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
