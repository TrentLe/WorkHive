const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    jobPostings: [JobPosting]!
    thoughts: [Thought]!
  }

  type Company {
    _id: ID
    companyname: String
    email: String
    password: String
    jobPostings: [JobPosting]!
    thoughts: [Thought]!
  }

  type JobPosting {
    _id: ID
    title: String!
    description: String!
    createdAt: String!
    author: User!
    likes: Int!
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
  }


  type Mutation {
    addUser(email: String!, password: String!, username: String!): Auth!
    login(email: String!, password: String!): Auth!
    createJobPosting(title: String!, description: String!, Author: String!): JobPosting!
    addThought(thoughtText: String!): Thought
    removeThought(thoughtId: ID!): Thought
    removeJobPosting(jobpostingId: ID!): JobPosting!
    likeJobPosting(jobpostingId: ID!): JobPosting!
    addCompany(email: String!, password: String!, companyname: String!): Auth!    
  }
`;

module.exports = typeDefs;
