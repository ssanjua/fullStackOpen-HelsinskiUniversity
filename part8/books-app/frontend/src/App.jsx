import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { gql, useQuery } from '@apollo/client';


const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      id
      born
      bookCount
    }
  }
`

const ALL_BOOKS = gql`
  query {
     allBooks { 
      title 
      author
      published 
      genres
    }
  }
`

const App = () => {
  const [page, setPage] = useState("authors");

  const result = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)

  if (result.loading || books.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      {page === "authors" && <Authors authors={result.data.allAuthors} show={page === "authors"} />}

      {page === "books" && <Books books={books.data.allBooks} show={page === "books"} />}

      {page === "add" && <NewBook show={page === "add"} refetchAuthors={result.refetch} refetchBooks={books.refetch} />}
    </div>
  );
};

export default App;
