require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

// setup apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // callback. this is middleware so we get the req/res from express and then forward it to the context, which we can then access in graphql posts resolver 
  context: ({ req }) => ({ req })
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

  