const Author = require("./models/author")
const Book = require("./models/Book")
const { GraphQLError } = require("graphql")
const mongoose = require('mongoose')
const User = require("./models/user")
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()


const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({}).populate('author')
      return books
    },
    allAuthors: async () => {
      const authors = await Author.find({}).populate('books')
      return authors
    },
    me: (root, args, context) => {
      return context.currentUser
    },
    allGenres: async () => {
      const books = await Book.find({})
      const genresSet = new Set()
      books.forEach(book => {
        book.genres.forEach(genre => {
          genresSet.add(genre);
        });
      });
      return Array.from(genresSet);
    }
  },
  Author: {
    bookCount: async (root) => {
      return await Book.countDocuments({ author: root.id })
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("no authorization", {
          extensions: {
            code: "UNAUTHORIZED"
          }
        })
      }
      try {
        const author = await Author.findOne({ name: args.author })
        let authorId;

        if (!author) {
          const newAuthor = new Author({ name: args.author })
          const res = await newAuthor.save()
          authorId = res.id
        } else {
          authorId = author.id
        }

        const book = new Book({ ...args, author: authorId })
        const savedBook = await book.save()
        await savedBook.populate('author')
        pubsub.publish('BOOK_ADDED', { bookAdded: savedBook })
        return savedBook
      } catch (e) {
        throw new GraphQLError("Error occurred", {
          extensions: {
            code: 'BAD_REQUEST'
          }
        })
      }
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("No authorized", {
          extensions: {
            code: "UNAUTHORIZED"
          }
        })
      }
      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo
      return author.save()
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })

      return user.save()
        .catch(error => {
          throw new GraphQLError("Error creating user", {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT"
          }
        })
      }
      const userForToken = {
        username: user.name,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
}

module.exports = resolvers