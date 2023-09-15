import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      profilepicture
      thoughts {
        _id
        thoughtAuthor
        thoughtText
        createdAt
      }
    }
  }
`;

export const QUERY_USERS = gql`
query users {
  users {
    _id
    bio
    email
    profilepicture
    username
  }
}
`;

export const QUERY_THOUGHTS = gql`
  query getThoughts {
    thoughts {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
    
  }
`;

export const QUERY_SINGLE_THOUGHT = gql`
  query getSingleThought($thoughtId: ID!) {
    thought(thoughtId: $thoughtId) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
query me {
  me {
    _id
    bio
    email
    profilepicture
    username
    thoughts {
      _id
      createdAt
      thoughtAuthor
      thoughtText
      comments {
        _id
        commentAuthor
        commentText
        createdAt
      }
    }
  }
}
`;

export const QUERY_FOLLOWING = gql`
  query following {
    following {
      _id
      username  
    }
  }`;
  