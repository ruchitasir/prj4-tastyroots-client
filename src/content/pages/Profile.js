import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Card, Container } from 'semantic-ui-react'

const Profile = props => {

  let [secretMessage, setSecretMessage] = useState('')
  let [userData, setUserData] = useState({})

  useEffect(() => {
    // Get the token from local storage
    let token = localStorage.getItem('boilerToken')
    // Make a call to a protected route
    fetch(process.env.REACT_APP_SERVER_URL + 'profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        console.log('Response', response)
        if (!response.ok) {
          setSecretMessage('Nice try!')
          return
        }
        // If we get a good response
        response.json()
          .then(result => {
            console.log(result)
            setUserData(result)
            setSecretMessage(result.message)
          })
      })
      .catch(err => {
        console.log("Error in profile", err)
        setSecretMessage('No message for you')
      })
  }, [])
  // Make Sure there is a user before trying to show their info
  if (!props.user) {
    return <Redirect to="/" />
  }


    var recipes = userData.recipes
    console.log(recipes)
    var display 
    if(recipes){
      display = recipes.map((r) => {
        return (
          <div>
          {r.recipeName}
          </div>
        )
      })
    }
    else{
      display = "Loading..."
    }



  console.log('userData:', userData)

  return (

    <div>
      {display}
    </div>
    // <Container>
    //   <h2>{props.user.firstname} {props.user.lastname}</h2>
    //   <img src={props.user.pic} alt="profile pic" />
    //   <Card.Group itemsPerRow={4}>
    //     {display}
    //   </Card.Group>
    //   <h2>{secretMessage}</h2>

    // </Container>
  )
}

export default Profile
