import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { useQuery } from '@apollo/client';
import LoginForm from "./components/LoginForm";
import { ALL_AUTHORS, ALL_BOOKS } from './graphql/queries';
import { useApolloClient } from '@apollo/client';
import Recommend from "./components/Recommend";


const App = () => {
  const [page, setPage] = useState("authors")
  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const result = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)

  const userToken = localStorage.getItem('user-token')

  const isUserLoggedIn = userToken !== null;

  if (result.loading || books.loading) {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        {!isUserLoggedIn && (<button onClick={() => setPage("login")}>login</button>)}
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {isUserLoggedIn && ( 
          <>
          <button onClick={() => setPage("add")}>add book</button>
          <button onClick={() => setPage("recommend")}>recommend</button>
          <button onClick={logout}>logout</button>
          </>
        )}
      </div>

      {page === "login" && <LoginForm setToken={setToken} />}

      {page === "authors" && <Authors authors={result.data.allAuthors} show={page === "authors"} />}

      {page === "books" && <Books books={books.data.allBooks} show={page === "books"} />}

      {page === "add" && <NewBook show={page === "add"} refetchAuthors={result.refetch} refetchBooks={books.refetch} />}
      
      {page === "recommend" && <Recommend books={books.data.allBooks} />}
      
    </div>
  );
};

export default App;
