const { gql } = require('apollo-server');

module.exports = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  input RegisterInput{
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    getPosts: [Post]
  }
  type Mutation {
    # registerInput is the argument of register(). RegisterInput is defined above. it's an input type
    register(registerInput: RegisterInput): User!,
    # this doesn't need a type because it only takes two things
    login(username: String!, password: String!): User!
  }
`