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
