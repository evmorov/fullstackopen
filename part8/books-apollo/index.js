const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const http = require('http')
const { readFileSync } = require('fs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const config = require('./utils/config')
const typeDefs = readFileSync('./schema.graphql').toString('utf-8')
const { execute, subscribe } = require('graphql')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const User = require('./models/user')
const resolvers = require('./resolvers')

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

console.log('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.error('error connecting to MongoDB:', error.message)
  })

const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const schema = makeExecutableSchema({ typeDefs, resolvers })

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    {
      server: httpServer,
      path: '',
    },
  )

  const basicLogging = {
    requestDidStart(requestContext) {
      console.log('')
      console.log(new Date())
      console.log(requestContext.request.query)
      console.log(requestContext.request.variables)
      return {
        didEncounterErrors(requestContext) {
          console.log(requestContext.errors)
        },
      }
    },
  }

  const subscriptionStart = {
    async serverWillStart() {
      return {
        async drainServer() {
          subscriptionServer.close()
        },
      }
    },
  }

  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
        const currentUser = await User.findById(decodedToken.id)
        return { currentUser }
      }
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }), basicLogging, subscriptionStart],
  })

  await server.start()

  server.applyMiddleware({
    app,
    path: '/',
  })

  const PORT = 4000

  httpServer.listen(PORT, () => console.log(`Server is now running on http://localhost:${PORT}`))
}

start()
