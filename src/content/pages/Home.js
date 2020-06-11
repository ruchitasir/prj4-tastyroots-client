import React from 'react'
import Signup from './Signup'
import { Container } from 'semantic-ui-react'

const Home = props => {
  if (props.user) {
    return (
      <Container className="top-spacing">
        <h1>Welcome to Tasty Roots!</h1>  
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
