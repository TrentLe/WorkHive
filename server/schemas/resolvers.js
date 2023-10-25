const { AuthenticationError } = require('apollo-server-express');
const { User, Thought, Contact, Comment } = require('../models');
const { signToken } = require('../utils/auth');
const fs = require('fs')
const path = require('path')


const resolvers = {

  Query: {
    users: async () => {
      return User.find().sort({ username: 1 }).populate({
        path: 'thoughts',
        options: {
          sort: { 
            createdAt: -1 
          }
        },
        populate: [
         {
          path: 'comments',
          options: {
            sort: {
              createdAt: 1
            }
          }
        },
        {
          path: 'likes',
        }
      ]
      }).populate('following').populate('followers').populate('comments')
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate({
        path: 'thoughts',
        options: {
          sort: { 
            createdAt: -1 
          }
        },
        populate: [
          {
           path: 'comments',
           options: {
             sort: {
               createdAt: 1
             }
           }
         },
         {
           path: 'likes',
         }
       ]
      }).populate('following').populate('followers').populate('comments')
    },
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: -1 }).populate('comments').populate('likes');
    },
    thought: async (parent, { thoughtId }) => {
      return Thought.findOne({ _id: thoughtId }).populate('comments').populate('likes');
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate({
          path: 'thoughts',
          options: {
            sort: { 
              createdAt: -1 
            }
          },
          populate: [
            {
             path: 'comments',
             options: {
               sort: {
                 createdAt: 1
               }
             }
           },
           {
             path: 'likes',
           }
         ]
        }).populate('following').populate('followers').populate('comments');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    contacts: async (parent, args, context, info) => {
      return Contact.find()
    },
    contact: async (parent, { name }, context, info) => {
      return Contact.findOne({ name })
    },
    comments: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Comment.find(params).populate('comments').populate('likes');
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
    removeComment: async (parent, { commentId, thoughtId }, context) => {
      if (context.user) {

        const comment = await Comment.findOneAndDelete({
          _id: commentId,
          commentAuthor: context.user.username,
        });

        await Thought.findOneAndUpdate(
          { _id: thoughtId },
          { $pull: { comments: comment._id } }
        );

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { comments: comment._id } }
        )

        return comment;
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
        const user = await User.findByIdAndUpdate(
        { _id: context.user._id },
        { $set: { username: username, email: email, password: password, profilepicture: profilepicture, bio: bio, } },
        { new: true },
        (error) => {
          if (error) {
            console.error(error)
          }
        }
      );

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

        const followedUser = await User.findOne({ userId })

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

        const unfollowedUser = await User.findOne({ userId })

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { following: userId } },
          { new: true }
        );

        await User.findOneAndUpdate(
          { _id: userId },
          { $pull: { followers: context.user._id } },
          { new: true }
        )
        return unfollowedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addContact: async (parent, { name, email, message }) => {
      const contact = await Contact.create({ name, email, message });
      return { contact };
    },
    addComment: async (parent, { thoughtId, commentText }, context) => {
      if (context.user) {
        const comment = await Comment.create({
          commentText,
          commentAuthor: context.user.username,
        });

        await Thought.findOneAndUpdate(
          { _id: thoughtId },
          { $addToSet: { comments: comment._id } }
        );

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { comments: comment._id } }
        )

        return comment;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addSubComment: async (parent, { commentId, commentText }, context) => {
      if (context.user) {
        const comment = await Comment.create({
          commentText,
          commentAuthor: context.user.username,
        });

        await Comment.findOneAndUpdate(
          { _id: commentId },
          { $addToSet: { comments: comment._id } },
          { new: true }
        );

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { comments: comment._id } },
          { new: true }
        )

        return comment;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addThoughtLike: async (parent, { thoughtId }, context) => {
      if (thoughtId && context.user) {

        const likedThought = await Thought.findOne({ thoughtId })

        await Thought.findOneAndUpdate(
          { _id: thoughtId },
          { $addToSet: { likes: context.user._id } },
          { new: true }
        );

        return likedThought;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    addCommentLike: async (parent, { commentId }, context) => {
      if (commentId && context.user) {

        const likedComment = await Comment.findOne({ commentId })
      
        await Comment.findOneAndUpdate(
          { _id: commentId },
          { $addToSet: { likes: userId} },
          { new: true }
        );
      
        return likedComment
      }    

      throw new AuthenticationError('You need to be logged in!');
    },
    removeThoughtLike: async (parent, { thoughtId }, context) => {
      if (context.user) {

        const unlikedthought = await Thought.findOne({ thoughtId })

        await Thought.findOneAndUpdate(
          { _id: thoughtId },
          { $pull: { likes: context.user._id } },
          { new: true }
        );

        return unlikedthought;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeCommentLike: async (parent, { commentId }, context) => {
      if (context.user) {

        const unlikedcomment = await Comment.findOne({ commentId })

        await Comment.findOneAndUpdate(
          { _id: commentId },
          { $pull: { likes: context.user._id } },
          { new: true }
        );

        return unlikedcomment;
      }
      throw new AuthenticationError('You need to be logged in!');
    },    
  },
};

module.exports = resolvers;

