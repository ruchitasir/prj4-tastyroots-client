// Packages
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Container, Form, Grid, Input } from 'semantic-ui-react'
import Alert from '../components/Alert'

const Signup = props => {
  // Declare and initialize state variables
  let [email, setEmail] = useState('')
  let [firstname, setFirstname] = useState('')
  let [lastname, setLastname] = useState('')
  let [message, setMessage] = useState('')
  let [password, setPassword] = useState('')
  let [profileUrl, setProfileUrl] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    console.log("submit", email, password)
    //  Send the user sign up data to the server
    fetch(process.env.REACT_APP_SERVER_URL+ 'auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        firstname,
        lastname,
        pic: profileUrl
      }),
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then(response =>{
        console.log('RESPONSE',response)
        // Handle non-200 responses
        if(!response.ok){
          setMessage(`${response.status}: ${response.statusText}`)
          return
        }
        // we get a good (200) response, get the token
        response.json().then(result=>{
          console.log("Result ",result)
          // Giving the token back up to App.js
          props.updateToken(result.token)
        })
        
    })
    .catch(err=>{
        console.log('ERROR SUBMITTING',err)
    })
  }
  console.log("MESSAGE", message)
  if(props.user){
    return <Redirect to="/profile"/>
  }

  return (
    <Container className="center-form top-spacing">   
      { message ? <Alert message={message}/> : '' }
      <Grid columns={2} verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={6} >  
          </Grid.Column>
          <Grid.Column width={2}></Grid.Column>
          <Grid.Column width={6}>
            <h3>Sign up</h3>
            <Form onSubmit={handleSubmit} className="signup">
              <span className="red">{message}</span>
              <Form.Group>
                <Form.Field>
                  <label>First Name</label>
                <Input name="firstname" placeholder="Your first name" onChange={(e) => setFirstname(e.target.value)} required/>
                </Form.Field>
                <Form.Field>
                <label>Last Name</label>
                <Input name="lastname" placeholder="Your last name" onChange={(e) => setLastname(e.target.value)} required/>
                </Form.Field>
              </Form.Group>
              <Form.Group>
                <Form.Field>
                  <label>Email</label>
                <Input type="email" placeholder="Your email"name="email" onChange={(e) => setEmail(e.target.value)} required/>
                </Form.Field>
                <Form.Field>
                  <label>Password</label>
                <Input type="password" placeholder="Minimum- 8 characters"name="password" onChange={(e) => setPassword(e.target.value)} required/>
                </Form.Field>
              </Form.Group>
              <Button type="submit" color="yellow">Sign Me Up!</Button>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  )
}

export default Signup
