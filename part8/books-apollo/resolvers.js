const { UserInputError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

const resolvers = {
  Author: {
    bookCount: async (root, args, { booksLoader }) => {
      const books = await booksLoader.load(root.id)
      return books.length
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

      context.booksLoader.clearAll()

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

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

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

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
}

module.exports = resolvers
