import PropTypes from 'prop-types';

const Books = ({ books }) => {

  if (books === null) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Published</th>
            <th>Author</th>
            <th>Genres</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.published}</td>
              <td>{book.author.name}</td>
              <td>{book.genres.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

Books.propTypes = {
  books: PropTypes.array
};

export default Books
