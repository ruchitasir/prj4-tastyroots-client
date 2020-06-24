import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import ProfilePage from '../components/ProfilePage'
import UserFromDB from '../components/UserFromDB'
import TopButton from '../components/TopButton'

const Profile = props => {

  let [userDetails, setUserDetails] = useState(null)
  let [updateState,setUpdateState]= useState(false)


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
  }, [updateState])
  // If user isn't signed in, redirect to home page to login
  if (!props.user) {
    return (
    <Redirect to="/" />
    )
  }
  // If user signed in show, user details
  return (
    <div>
      <ProfilePage user={props.user} userDetails={userDetails} updateState={updateState} 
      setUpdateState={setUpdateState} />
      <TopButton />
    </div>
    
  )
}

export default Profile
