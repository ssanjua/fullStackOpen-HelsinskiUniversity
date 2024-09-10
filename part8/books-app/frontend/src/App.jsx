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

  console.log(result)
  if (result.loading) {
    return <div>loading...</div>
  }

  // useEffect(() => {
  //   fetch('http://localhost:4000', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       query: `
  //         query {
  //           authorCount
  //         } 
  //       `
  //     })
  //   })
  //   .then(res => res.json())
  //   .then(res => {
  //     console.log(res.data)
  //   })
  // })

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      <Authors authors={result.data.allAuthors} show={page === "authors"} />

      <Books books={books.data.allBooks}  show={page === "books"} />

      <NewBook show={page === "add"} />
    </div>
  );
};

export default App;
