// Packages
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Form, Input, Menu } from 'semantic-ui-react'


const Login = props => {
  // Declare and initialize state variables
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')

  // Event handlers
  const handleSubmit = (e) => {
    e.preventDefault()
    //Send the user sign up data to the server
    // Fetch call to POST data
    fetch(process.env.REACT_APP_SERVER_URL + 'auth/login', {
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
        //Handle non-200 responses
        if (!response.ok) {
          props.setMessage(`${response.status}: ${response.statusText}`)
          console.log(props.message)
          return
        }
        //we got a good (200) response, we get the token
        response.json()
          .then(result => {
            //Giving the token back up to 
            props.updateToken(result.token)
          })
      })
      .catch(err => {
        console.log('ERROR SUBMITTING: ', err)
      })
  }
  if (props.user) {
    return <Redirect to="/profile" />
  }
  

  return (
    <Menu.Menu position='right' className="login">
      <Form size={"tiny"} onSubmit={handleSubmit}>
        <Form.Group className="login-fields" inline>
          <Menu.Item>
            <Input label="Email" onChange={(e) => setEmail(e.target.value)} />
          </Menu.Item>
          <Menu.Item>
            <Input label="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
          </Menu.Item>
          <Menu.Item>
            <Button className="mauve-bg white-font" size={"tiny"} content="Login" icon="sign-in" labelPosition="right" type="submit" />
          </Menu.Item>
        </Form.Group>
      </Form>
    </Menu.Menu>
  )
}

export default Login
