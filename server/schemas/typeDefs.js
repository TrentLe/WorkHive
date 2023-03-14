const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String    
    bio: String
    profilePicture: String
    thoughts: [Thought]!
    followers: [User]!
    following: [User]!
  }

  type Company {
    _id: ID
    companyname: String
    email: String
    password: String
    bio: String
    profilePicture: String
    jobPostings: [JobPosting]!
    thoughts: [Thought]!
  }

  type JobPosting {
    _id: ID
    title: String!
    description: String!
    createdAt: String!
    author: Company!
    likes: Int!
    comments: [Comment]!
  }

  type Thought {
    _id: ID
    thoughtText: String
    thoughtAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type File {
    url: String!
    filename: String!
    encoding: String!
    mimetype: String!
  }

  type Contact {
    _id: ID
    name: String
    email: String
    message: String
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
    thoughts(username: String): [Thought]
    thought(thoughtId: ID!): Thought
    companies: [Company]
    company(companyname: String): Company
    followers: [User]
    following: [User]
    contacts: [Contact]
    contact(name: String): Contact
  }


  type Mutation {
    addUser(email: String!, password: String!, username: String!): Auth!
    login(email: String!, password: String!): Auth!
    companyLogin(email: String!, password: String!): Auth!
    createJobPosting(title: String!, description: String!): JobPosting
    addThought(thoughtText: String!): Thought
    removeThought(thoughtId: ID!): Thought
    removeJobPosting(jobpostingId: ID!): JobPosting
    likeJobPosting(jobpostingId: ID!): JobPosting
    addCompany(email: String!, password: String!, companyname: String!): Auth!
    uploadImage(file: String!): File!
    updateUser(id: ID!, username: String, email: String, password: String, profilePicture: String, bio: String): User
    updateCompany(id: ID!, companyname: String, email: String, password: String, profilePicture: String, bio: String): Company
    deleteUser(userId: ID!): User
    deleteCompany(companyId: ID!): Company
    addFollow(userId: ID!): User
    removeFollow(userId: ID!): User
    addContact(name: String, email: String, message: String): Contact
  }
`;

module.exports = typeDefs;
