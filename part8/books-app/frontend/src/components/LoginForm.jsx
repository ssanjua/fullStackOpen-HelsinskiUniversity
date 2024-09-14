import { useState, useEffect } from "react"
import { useMutation } from "@apollo/client"
import PropTypes from 'prop-types'
import { LOGIN } from '../graphql/queries'

const LoginForm = ({ setToken }) => {
  const [ username, setUsername ] = useState("")
  const [ password, setPassword ] = useState("")

  const [ login, result ] = useMutation(LOGIN, {
    onError: error => {
      console.log(error.graphQLErrors[0].message)
    }
  })


  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('user-token', token)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data])

  const handleSubmit = (event) => {
    event.preventDefault()

    login({ variables: { username, password }})
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          username 
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = { 
  setToken: PropTypes.func.isRequired,
}

export default LoginForm