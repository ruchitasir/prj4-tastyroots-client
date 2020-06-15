// Packages
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Container, Form, Icon, Image, Message, Grid } from 'semantic-ui-react'
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

    <Container fluid className="center-form middle">
      {/* {message ? <Alert message={message} /> : ''} */}
      <Grid columns={2} verticalAlign="middle" stackable>
        <Grid.Row>
          <Grid.Column width={10}>
            <Image src="https://res.cloudinary.com/tasty-roots/image/upload/v1592190472/tasty-roots/Beet_v2_bwqzcv.png"/>
          </Grid.Column>
          <Grid.Column width={1}></Grid.Column>
          <Grid.Column width={5}>
            <Message
              attached
              header='Welcome to our site!'
              content='Fill out the form to create a new account.'
              className="burgundy-font"
            />
            <Form className='attached fluid segment' onSubmit={handleSubmit}>
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
              <Form.Input label='Password' type='password' onChange={(e) => setPassword(e.target.value)} required placeholder="minimum 8 characters" />
              <Button className="mauve-bg white-font">Submit</Button>
            </Form>
            <Message attached='bottom'>
              {message ? <><Icon name='Exclamation' className="mauve-font" /><span className="pink-font">{message}</span></> : <><Icon name='help' /><span className="dark-grey">Already signed up? Login above.</span></>}
            </Message>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  )
}

export default Signup
