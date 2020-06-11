import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import ProfilePage from '../components/ProfilePage'

const Profile = props => {

  let [userDetails, setUserDetails] = useState(null)

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
          return
        }
        // If we get a good response, set the user details
        response.json()
          .then(result => {
            setUserDetails(result)
          })
      })
      .catch(err => {
        console.log("Error in profile", err)
      })
  }, [])
  // If user isn't signed in, redirect to home page to login
  if (!props.user) {
    return (
    <Redirect to="/" />
    )
  }
  // If user signed in show, user details
  return (
    <ProfilePage user={props.user} userDetails={userDetails} />
  )
}

export default Profile
