// Packages
import React, { useState, useEffect } from 'react'
import{ Redirect } from 'react-router-dom'

const Login = props => {
  // Declare and initialize state variables
  let [email, setEmail] = useState('')
  let [message, setMessage] = useState('')
  let [password, setPassword] = useState('')

  useEffect(() => {
    setMessage('')
  }, [email, password])

  // Event handlers
  const handleSubmit = e => {
    // TODO: Fetch call to POST data
    e.preventDefault();
    fetch(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        setMessage(`${response.status}: ${response.statusText}`)
        return;
      }

      response.json().then(result => {
        console.log(result);
        props.updateUser(result.token);
      })
    })
    .catch(err => {
      console.log(err);
      setMessage(`${err.toString()}`);
    })

    // maka fetch request to the get route of the server to check the authentication
    // setMessage to the error if not authenticated
    // if authenticated we are going to updateUser + redirect to profile
    
  }

  if (props.user) {
    return <Redirect to='/profile' />    
  }

  return (
    <div>
      <h2>Login</h2>
      <span className="red">{message}</span>
      <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input type="email" name="email" onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit">Beam Me Up!</button>
        </form>
    </div>
  )
}

export default Login
