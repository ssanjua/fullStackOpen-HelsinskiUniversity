const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')


const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const Author = require('./models/author.js')
const Book = require('./models/Book.js')
const User = require('./models/user.js')

require('dotenv').config()

const MONGO_URI = process.env.MONGODB_URI
console.log("connected to ", MONGO_URI)

const JWT_SECRET = process.env.JWT_SECRET

mongoose.connect(MONGO_URI).then(() => {
  console.log("connected to MongoDB")
}).catch((error) => {
  console.log("error conencting to mongoDB", error.mesage)
})

const pubsub = new PubSub()

const typeDefs = `
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Books {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]
  }
  
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int
    authorCount: Int
    allBooks(author: String, genre: String): [Books!]
    allAuthors: [Author!]
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]
    ) : Books
    editAuthor(
      name: String!
      setBornTo: Int!
    ) : Author 
    createUser(
      username: String!
      favoriteGenre: String!
    ) : User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Books!
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({}).populate('author')
      return books
    },
    allAuthors: async () => {
      return await Author.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
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

      return { value: jwt.sign(userForToken, JWT_SECRET)}
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  },
}).then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})