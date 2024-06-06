const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type AuthPayload {
    user: User!
    token: String!
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
  }

  type Query {
    users: [User]
    getUser(id: ID!): User
  }
`;

module.exports = { typeDefs };
