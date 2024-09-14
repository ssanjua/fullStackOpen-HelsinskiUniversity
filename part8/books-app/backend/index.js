const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const { GraphQLError } = require('graphql')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const Author = require('./models/author.js')
const Book = require('./models/Book.js')

require('dotenv').config()

const MONGO_URI = process.env.MONGODB_URI
console.log("connected to ", MONGO_URI)

mongoose.connect(MONGO_URI).then(() => {
  console.log("connected to MongoDB")
}).catch((error) => {
  console.log("error conencting to mongoDB", error.mesage)
})

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

  type Query {
    bookCount: Int
    authorCount: Int
    allBooks(author: String, genre: String): [Books!]
    allAuthors: [Author!]
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
  },
  Author: {
    bookCount: async (root) => {
      return await Book.countDocuments({ author: root.id })
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      try {
        const author = await Author.findOne({ name: args.author }) // Buscar el autor
        let authorId;

        if (!author) {
          const newAuthor = new Author({ name: args.author })
          const res = await newAuthor.save()
          authorId = res.id 
        } else {
          authorId = author.id
        }

        const book = new Book({ ...args, author: authorId }) 
        const savedBook = await book.save(); 
        await savedBook.populate('author');
        return savedBook; 
      } catch (e) {
        throw new GraphQLError("Error occurred", {
          extensions: {
            code: 'BAD_REQUEST'
          }
        })
      }
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      author.born = args.born
      return author.save()
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})