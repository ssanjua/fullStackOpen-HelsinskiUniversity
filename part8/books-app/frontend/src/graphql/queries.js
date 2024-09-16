import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
    ...AuthorsDetails
    }
  }

  fragment AuthorsDetails on Author {
    name
    id
    born
    bookCount
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

export const GET_USER = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`