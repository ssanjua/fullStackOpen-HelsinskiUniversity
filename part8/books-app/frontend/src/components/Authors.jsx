import PropTypes from 'prop-types'
import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../graphql/queries'
import { EDIT_AUTHOR } from '../graphql/mutations'

const Authors = ({ authors }) => {
  const [ editedAuthorName, setEditedAuthorName ] = useState('')
  const [ editedBornYear, setEditedBornYear ] = useState('')

  const { data, refetch } = useQuery(ALL_AUTHORS)

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    onCompleted: () => refetch(ALL_AUTHORS)
  })

  if (!data) {
    return null
  }

  const submit = async ( event ) => {
    event.preventDefault()

    editAuthor({ variables: { editedAuthorName, editedBornYear: parseInt(editedBornYear)} })

    setEditedAuthorName('')
    setEditedBornYear('')
  }

  
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>author</th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>set birthyear</h2>
      <form onSubmit={submit}>
        <label>name
        <select value={editedAuthorName} onChange={({ target }) => setEditedAuthorName(target.value)}>
            <option value="">Select author</option>
            {authors.map((a) => (
              <option key={a.name} value={a.name}>{a.name}</option>
            ))}
          </select>
        </label>
        <label>born
          <input value={editedBornYear} type="text" placeholder="author name" onChange={({ target }) => setEditedBornYear(target.value)} />
        </label>
        <button>update author</button>
      </form>
    </div>
  )
}

Authors.propTypes = {
  authors: PropTypes.array
};

export default Authors
