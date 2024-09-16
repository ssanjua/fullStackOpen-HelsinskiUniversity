import { gql } from "@apollo/client"

export const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      title
      author {
        name
        id
      }
      published
      genres
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation addAuthorInfo ($editedAuthorName: String!, $editedBornYear: Int!) {
    editAuthor(
      name: $editedAuthorName,
      setBornTo: $editedBornYear
    ) {
      name
      born  
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
    value
    }  
  }
`;