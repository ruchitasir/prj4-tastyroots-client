import React from 'react'
import Signup from './Signup'

const Home = props => {
  if (props.user) {
    return (
      <div>
        <h1>Welcome to Tasty Roots!</h1>
      </div>
    )
  }
  return (
    <div>
      <Signup user={props.user} updateToken={props.updateToken}/>    
    </div>
  )
}

export default Home
