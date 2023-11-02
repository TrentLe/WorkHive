import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query User($username: String!) {
  user(username: $username) {
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
      likes {
        _id
      }
    }
    followers {
      _id
      bio
      email
      profilepicture
      username
    }
    following {
      _id
      bio
      email
      profilepicture
      username
    }
  }
}
`;

export const QUERY_USERS = gql`
query Users {
  users {
    _id
    bio
    email
    profilepicture
    username
    thoughts {
      thoughtText
      thoughtAuthor
      createdAt
      _id
      comments {
        _id
        commentAuthor
        commentText
        createdAt
      }
      likes {
        _id
      }
    }
    followers {
      _id
      bio
      email
      profilepicture
      username
    }
    following {
      _id
      bio
      email
      username
      profilepicture
    }
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
        commentAuthor
        commentText
        createdAt
      }
      likes {
        _id
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
        commentAuthor
        commentText
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
query Me {
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
      likes {
        _id
      }
    }
    followers {
      _id
      bio
      email
      profilepicture
      username
    }
    following {
      _id
      bio
      email
      profilepicture
      username
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
  