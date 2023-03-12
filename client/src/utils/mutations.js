import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_THOUGHT = gql`
  mutation addThought($thoughtText: String!) {
    addThought(thoughtText: $thoughtText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($thoughtId: ID!, $commentText: String!) {
    addComment(thoughtId: $thoughtId, commentText: $commentText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

export const ADD_JOB = gql`
mutation createJobPosting($title: String!, $description: String!, $author: String!) {
  createJobPosting(title: $title, description: $description, Author: $author) {
    _id
    description
    title
    comments {
      _id
      commentText
    }
  }
}`;

export const ADD_COMPANY = gql`
  mutation addCompany($companyname: String!, $email: String!, $password: String!) {
    addCompany(companyname: $companyname, email: $email, password: $password) {
      token
      company {
        _id
        companyname
      }
    }
  }
`;

export const LOGIN_COMPANY = gql`
  mutation companyLogin($email: String!, $password: String!) {
    companyLogin(email: $email, password: $password) {
      token
      company {
        _id
        companyname
      }
    }
  }
`;

export const UPLOAD_IMAGE = gql`
  mutation UploadImage($file: Upload!) {
    uploadImage(file: $file) {
     url
    }
  }
`;

export const ADD_FOLLOW = gql`
  mutation addFollow($followId: ID!) {
    addFollow(followId: $followId) {
      _id
      username
      email
      followerCount
      followers {
        _id
        username
      }
    }
  }
`;

export const REMOVE_FOLLOW = gql`
  mutation removeFollow($followId: ID!) {
    removeFollow(followId: $followId) {
      _id
      username
      email
      followerCount
      followers {
        _id
        username
      }
    }
  }
`;

