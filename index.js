const { ApolloServer, AuthenticationError } = require("apollo-server-express");
const express = require("express");
const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");
const { sequelize } = require("./models");
const jwt = require("jsonwebtoken");

const startServer = async () => {
  await sequelize.sync();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization || "";
      if (token) {
        try {
          const user = jwt.verify(token.replace("Bearer ", ""), "key");
          console.log("user index = ", user);
          return { user };
        } catch (e) {
          throw new AuthenticationError("Your session expired. Sign in again.");
        }
      }
    },
  });

  await server.start();

  const app = express();

  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
