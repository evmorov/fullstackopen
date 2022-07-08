const { ApolloServer, UserInputError } = require('apollo-server')
const { readFileSync } = require('fs')
const mongoose = require('mongoose')
const config = require('./utils/config')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const typeDefs = readFileSync('./schema.graphql').toString('utf-8')

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

const resolvers = {
  Author: {
    bookCount: async (root) => {
      return await Book.count({ author: root._id })
    },
  },

  Query: {
    bookCount: async () => {
      return await Book.collection.countDocuments()
    },

    authorCount: async () => {
      return await Author.collection.countDocuments()
    },

    allBooks: async (root, args) => {
      let allBooks = Book.find({}).populate('author')

      if (args.author) {
        let author = await Author.findOne({ name: args.author })
        if (!author) return []

        allBooks = allBooks.find({ author: { $in: author._id } })
      }

      if (args.genre) {
        allBooks = allBooks.find({ genres: { $in: args.genre } })
      }

      return await allBooks
    },

    allAuthors: async () => {
      return await Author.find({})
    },

    me: (root, args, context) => {
      return context.currentUser
    },
  },

  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) throw new UserInputError('Authenticated users only')

      const authorName = args.author
      let author = await Author.findOne({ name: authorName })
      author ||= await new Author({ name: authorName }).save().catch((error) => {
        throw new UserInputError(error.message, { invalidArgs: args })
      })

      const book = new Book({ ...args })
      book.author = author
      await book.save().catch((error) => {
        throw new UserInputError(error.message, { invalidArgs: args })
      })
      return book
    },

    editAuthor: async (root, args, context) => {
      if (!context.currentUser) throw new UserInputError('Authenticated users only')

      const author = await Author.findOne({ name: args.name })
      if (!author) return null
      author.name = args.name
      author.born = args.setBornTo
      await author.save().catch((error) => {
        throw new UserInputError(error.message, { invalidArgs: args })
      })
      return author
    },

    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save().catch((error) => {
        throw new UserInputError(error.message, { invalidArgs: args })
      })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
}

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

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
  plugins: [basicLogging],
})

console.log('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.error('error connecting to MongoDB:', error.message)
  })

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
