require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

// setup apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers
})

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('DB connected');
    return server.listen({ port: 5000 })
  })
  .then(res => {
    console.log(`Server running at ${ res.url }`)
  })

  