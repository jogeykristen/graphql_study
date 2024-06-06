const { User } = require("./models");
const { AuthenticationError } = require("apollo-server-express");
const { generateToken } = require("./auth");
const bcrypt = require("bcryptjs");

const resolvers = {
  Query: {
    users: async (_, __, { user }) => {
      console.log("user resolver = ", user);
      if (!user) throw new AuthenticationError("You must be logged in");
      return await User.findAll();
    },
    getUser: async (_, { id }, { user }) => {
      if (!user) throw new AuthenticationError("You must be logged in");
      return await User.findByPk(id);
    },
  },
  Mutation: {
    addUser: async (_, { name, email, password }) => {
      // Hash password before storing it in the database
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashedPassword });
      return {
        user,
      };
    },
    login: async (_, { email, password }) => {
      // Find user by email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new AuthenticationError("Invalid email or password");
      }
      // Compare hashed password
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        throw new AuthenticationError("Invalid email or password");
      }
      return {
        user,
        token: generateToken(user),
      };
    },
  },
};

module.exports = { resolvers };
