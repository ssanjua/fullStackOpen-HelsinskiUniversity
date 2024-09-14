import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      id
      born
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query allBooks($author: String, $genre: String) { 
    allBooks(author: $author, genre: $genre) { 
      title
      published
      author {
        name
        id
      }
      id
      genres
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
    value
    }  
  }
`;