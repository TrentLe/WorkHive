// const { gql } = require('apollo-server-express');

// const typeDefs = gql`
//   type User {
//     _id: ID
//     username: String
//     email: String
//     password: String
//     thoughts: [Thought]!
//   }

//   type Thought {
//     _id: ID
//     thoughtText: String
//     thoughtAuthor: String
//     createdAt: String
//     comments: [Comment]!
//   }

//   type Comment {
//     _id: ID
//     commentText: String
//     commentAuthor: String
//     createdAt: String
//   }

//   type Auth {
//     token: ID!
//     user: User
//   }

//   type Query {
//     users: [User]
//     user(username: String!): User
//     thoughts(username: String): [Thought]
//     thought(thoughtId: ID!): Thought
//     me: User
//   }

const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    jobPostings: [JobPosting]!
  }

  type JobPosting {
    _id: ID
    title: String!
    description: String!
    createdAt: String!
    author: User!
  }

  type Auth {
    token: String!
    user: User!
  }

  type Query {
    jobPostings: [JobPosting!]!
    jobPosting(id: ID!): JobPosting
    me: User
    users: [User]
    user(username: String): User
  }


  type Mutation {
    signup(email: String!, password: String!, username: String!): Auth!
    login(email: String!, password: String!): Auth!
    createJobPosting(title: String!, description: String!): JobPosting!
    removeJobPosting(jobpostingId: ID!): JobPosting!
    
  }
`;

module.exports = typeDefs;

//   type Mutation {
//     addUser(username: String!, email: String!, password: String!): Auth
//     login(email: String!, password: String!): Auth
//     addThought(thoughtText: String!): Thought
//     addComment(thoughtId: ID!, commentText: String!): Thought
//     removeThought(thoughtId: ID!): Thought
//     removeComment(thoughtId: ID!, commentId: ID!): Thought
//   }
// `;

// module.exports = typeDefs;
