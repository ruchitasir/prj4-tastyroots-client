// Packages
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Container, Form, Icon, Input, Message, Grid } from 'semantic-ui-react'
import Alert from '../components/Alert'

const Signup = props => {
  // Declare and initialize state variables
  let [email, setEmail] = useState('')
  let [firstname, setFirstname] = useState('')
  let [lastname, setLastname] = useState('')
  let [message, setMessage] = useState('')
  let [password, setPassword] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    console.log("submit", email, password)
    //  Send the user sign up data to the server
    fetch(process.env.REACT_APP_SERVER_URL + 'auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        firstname,
        lastname,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log('RESPONSE', response)
        // Handle non-200 responses
        if (!response.ok) {
          setMessage(`${response.status}: ${response.statusText}`)
          return
        }
        // we get a good (200) response, get the token
        response.json().then(result => {
          console.log("Result ", result)
          // Giving the token back up to App.js
          props.updateToken(result.token)
        })

      })
      .catch(err => {
        console.log('ERROR SUBMITTING', err)
      })
  }
  console.log("MESSAGE", message)
  if (props.user) {
    return <Redirect to="/profile" />
  }

  return (

    <Container className="center-form middle">
      {message ? <Alert message={message} /> : ''}
      <Grid columns={2} verticalAlign="middle">
        <Grid.Row>
          <Grid.Column></Grid.Column>
          <Grid.Column>
            <Message
              attached
              header='Welcome to our site!'
              content='Fill out the form below to sign-up for a new account'
            />
            <Form className='attached fluid segment'>
              <Form.Group widths='equal'>
                <Form.Input
                  fluid
                  label='First Name'
                  placeholder='First Name'
                  type='text'
                  onChange={(e) => setFirstname(e.target.value)} required
                />
                <Form.Input
                  fluid
                  label='Last Name'
                  placeholder='Last Name'
                  type='text'
                  onChange={(e) => setLastname(e.target.value)} required
                />
              </Form.Group>
              <Form.Input label='Email' placeholder='Email' type='email' onChange={(e) => setEmail(e.target.value)} required />
              <Form.Input label='Password' type='password' onChange={(e) => setEmail(e.target.value)} required placeholder="minimum 8 characters" />
              <Form.Checkbox inline label='I agree to the terms and conditions' />
              <Button color='blue'>Submit</Button>
            </Form>
            <Message attached='bottom' warning>
              <Icon name='help' />Already signed up? Login at the top instead.
</Message>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  )
}

export default Signup
