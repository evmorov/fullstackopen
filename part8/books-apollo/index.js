const { ApolloServer, UserInputError } = require('apollo-server')
const { readFileSync } = require('fs')
const mongoose = require('mongoose')
const config = require('./utils/config')
const Author = require('./models/author')
const Book = require('./models/Book')
const typeDefs = readFileSync('./schema.graphql').toString('utf-8')

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
  },

  Mutation: {
    addBook: async (root, args) => {
      const authorName = args.author
      let author = await Author.findOne({ name: authorName })
      try {
        author ||= await new Author({ name: authorName }).save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }

      const book = new Book({ ...args })
      book.author = author
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
      return book
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      if (!author) return null
      author.name = args.name
      author.born = args.setBornTo
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
      return author
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
