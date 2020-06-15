import React from 'react'
import Signup from './Signup'
import { Container, Grid, Header } from 'semantic-ui-react'

const Home = props => {
  if (props.user) {
    return (
      <Container className="top-spacing">
        <Header as="h1" className="burgundy-font">Welcome to Tasty Roots!</Header> 
        <Grid></Grid>

      </Container>
    )
  }
  return (
    <Container className="top-spacing">
      <Signup user={props.user} updateToken={props.updateToken}/>    
    </Container>
  )
}

export default Home
