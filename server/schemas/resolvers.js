const { AuthenticationError } = require('apollo-server-express');
const { User, Thought, Contact } = require('../models');
const { signToken } = require('../utils/auth');
const fs = require('fs')
const path = require('path')


const resolvers = {

  Query: {
    users: async () => {
      return User.find().populate('thoughts').populate('following').populate('followers')
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('thoughts').populate('following').populate('followers')
    },
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: -1 });
    },
    thought: async (parent, { thoughtId }) => {
      return Thought.findOne({ _id: thoughtId });
    },    
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('thoughts').populate('following').populate('followers');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    contacts: async (parent, args, context, info) => {
      return Contact.find()
    },
    contact: async (parent, { name }, context, info) => {
      return Contact.findOne({ name })
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
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
    addThought: async (parent, { thoughtText }, context) => {
      if (context.user) {
        const thought = await Thought.create({
          thoughtText,
          thoughtAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { thoughts: thought._id } }
        );

        return thought;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeThought: async (parent, { thoughtId }, context) => {
      if (context.user) {
        const thought = await Thought.findOneAndDelete({
          _id: thoughtId,
          thoughtAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { thoughts: thought._id } }
        );

        return thought;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    uploadImage: async (parent, { file }, context, info) => {
      const { createReadStream, filename, mimetype, encoding } = await file

      const stream = createReadStream()
      const pathName = path.join(__dirname, `./public/images/${filename}`)
      await stream.pipe(fs.createWriteStream(pathName))
      
      return {
        url: `http://localhost:3001/public/images/${filename}`
      }
    },
    updateUser: async (_, { id, username, email, password, profilepicture, bio }, context) => {
      console.log(id, profilepicture, context.user._id)
      const user = await User.findByIdAndUpdate(
        {_id: context.user._id},
        {$set: { username: username, email: email, password: password, profilepicture: profilepicture, bio: bio, }},
        { new: true },
        (error, updatedUser) => {
          if (error) {
            console.error(error)
          } else {
            console.log(updatedUser)
          }
        }
      );
      console.log(user)
      return user;
    },
    deleteUser: async (parent, { userId }, context) => {
      try {
        const deletedUser = await User.findOneAndDelete({ _id: userId });
        if (!deletedUser) {
          throw new Error('User not found');
        }
        // delete related thoughts
        await Thought.deleteMany({ thoughtAuthor: deletedUser.username });
        // delete related job postings
        return { message: 'User deleted successfully' };
      } catch (err) {
        console.log(err);
        throw new Error('Error deleting user');
      }
    },
    addFollow: async (parent, { userId }, context) => {
      if (context.user) {

        const followedUser = await User.findOne({userId})
        
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { following: userId } },
          { new: true }
        );

        await User.findOneAndUpdate(
          { _id: userId },
          { $addToSet: { followers: context.user._id } },
          { new: true }
        )
        return followedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeFollow: async (parent, { userId }, context) => {
      if (context.user) {
        const followingUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { following: userId } },
          { new: true }
        );

        const followerUser = await User.findOneAndUpdate(
          { _id: userId },
          { $pull: { followers: context.user._id } },
          { new: true }
        )
        return { followingUser, followerUser };
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addContact: async (parent, { name, email, message }) => {
      const contact = await Contact.create({ name, email, message });
      return { contact };
    },
    addComment: async (parent, { thoughtId, commentText }, context) => {
      if (context.user) {
        return Thought.findOneAndUpdate(
          { _id: thoughtId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
