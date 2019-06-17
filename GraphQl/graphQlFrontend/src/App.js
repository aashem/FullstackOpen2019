import React,{useState} from 'react';
import {Query, Mutation, ApolloConsumer} from 'react-apollo'
import {gql} from 'apollo-boost'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBooks'


//Queries

const ALL_BOOKS = gql `
{
  booksAll{
    title
    author
    genres
    id
    published
  }
}
`
export const ALL_AUTHORS = gql `
{
  authorsAll{
    name
    born
    id
    bookCount
  }
}
`

//mutations


const CREATE_BOOK = gql `
mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String]!){
  addBook(
    title: $title
    author: $author
    published: $published
    genres: $genres
  ){
    title
    author
    published
    genres
  }
}
`
export const SET_BIRTH = gql `
mutation editBorn($name: String!, $born: Int!){
  editBorn(
    name: $name
    born: $born
  ){
    name
    born
  }
}
`

  


const App = () => {
  const [page, setPage] = useState('authors')

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Query query = {ALL_AUTHORS} pollInterval = {2000}>
        {(result) => 
        <Authors
        show={page === 'authors'}
        authors = {result}
        />}
      </Query>
      
      <Query query = {ALL_BOOKS} pollInterval = {2000}>
        {(result) => 
        <Books
          show={page === 'books'}
          books = {result}
        />}
      </Query>

      <Mutation 
        mutation = {CREATE_BOOK}
        refetchQueries= {[{query: ALL_BOOKS, ALL_AUTHORS}]}
      >
        {(addBook) => 
      <NewBook
        show={page === 'add'}
        newBook = {addBook}
      />
      }
    </Mutation>
    </div>
  )
}
  


export default App;
