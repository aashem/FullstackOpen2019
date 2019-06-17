const { ApolloServer, gql } = require('apollo-server')
const uuid = require('uuid/v1')

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`

    type Book {
        title: String!
        published: Int!
        author: String!
        genres: [String]!
        id: ID!
    }

    type Author {
        name: String!
        born: Int
        id:ID!
        bookCount: Int
    }

  type Query {
    bookCount: Int!
    authorCount: Int!
    booksAll(author: String, genre: String): [Book!]!
    authorsAll: [Author!]!
  }

  type Mutation {
      addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String]!
      ): Book
      editBorn(
          name: String!
          born: Int!
      ): Author
  }
`

const resolvers = {
  Query: {
      bookCount: () => books.length,
      authorCount: () => authors.length,
      booksAll: (root, args) => {
          if(!args.author && !args.genre){
              return books
          }
          if(args.genre && !args.author){
              return books.filter(b => b.genres.includes(args.genre))
          }
          if(args.genre && args.author){
            let authorsBooks = [...books.filter(b => b.author.includes(args.author))]
            return authorsBooks.filter(b => b.genres.includes(args.genre))
          }

        
        return books.filter(b => b.author.includes(args.author))
    },
      authorsAll: () => {
          authors.map(a => a.bookCount = (books.filter(b => b.author.includes(a.name))).length )
          return authors
        }
    },
    Mutation: {
        addBook:(root, args) => {
            if(args.title.length === 0 || args.author.length === 0 || args.published === 0 || args.genres.length === 0 ){
              console.log("Some fields are empty")
              return
            }

            if(books.find(b => b.title === args.title)){
                console.log('error')
                return 
            }
            if(!authors.find(a => a.name === args.author)){
                let author = {name: args.author, id:uuid()}
                console.log(author)
                authors = authors.concat(author)
            }
            let book = {...args, id:uuid()}
            books = books.concat(book)
            return book
        },
        editBorn:(root, args) => {
            let author = authors.find(a => a.name === args.name)
            if(!author){
                return null
            }
            let updatedAuthor = {...author, born: args.born}
            authors = authors.map(a => a.name === args.name ? updatedAuthor: a)
            return updatedAuthor
        } 
    }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
