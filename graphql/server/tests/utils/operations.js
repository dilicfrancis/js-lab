import { gql } from "apollo-boost";

export const createUser = gql`
  mutation ($userData: CreateUserInput!) {
    createUser(userData: $userData) {
      user {
        id
      }
    }
  }
`;

export const allUsers = gql`
  query {
    allUsers {
      id
      name
      email
    }
  }
`;

export const loginUser = gql`
  mutation ($loginData: LoginInput!) {
    loginUser(loginData: $loginData) {
      user {
        name
      }
    }
  }
`;

export const user = gql`
  query {
    user {
      id
      name
      email
    }
  }
`;

export const allPosts = gql`
  query {
    allPosts {
      id
      published
    }
  }
`;

export const userPosts = gql`
  query {
    userPosts {
      title
      published
    }
  }
`;

export const updatePost = gql`
  mutation ($id: ID!, $postData: UpdatePostInput!) {
    updatePost(id: $id, postData: $postData) {
      title
      body
      published
    }
  }
`;

export const createPost = gql`
  mutation ($postData: CreatePostInput!) {
    createPost(postData: $postData) {
      id
      title
    }
  }
`;

export const deletePost = gql`
  mutation ($id: ID!) {
    deletePost(id: $id) {
      id
      title
    }
  }
`;

export const deleteComment = gql`
  mutation ($id: ID!) {
    deleteComment(id: $id) {
      id
    }
  }
`;

export const subscribeToComments = gql`
  subscription ($id: ID!) {
    comments(postID: $id) {
      node {
        id
        text
      }
      mutation
    }
  }
`;

export const subscribeToPosts = gql`
  subscription {
    posts {
      mutation
    }
  }
`;

export const createComment = gql`
  mutation ($comment: CreateCommentInput!) {
    createComment(commentData: $comment) {
      id
    }
  }
`;
