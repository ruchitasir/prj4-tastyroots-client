import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import ProfilePage from '../components/ProfilePage'

const Profile = props => {

  let [secretMessage, setSecretMessage] = useState('')
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
          setSecretMessage('Nice try!')
          return
        }
        // If we get a good response
        response.json()
          .then(result => {
            console.log(result)
            // setUserData(result)
            console.log("WHAT RESULT", result)
            setUserDetails(result)
          })
      })
      .catch(err => {
        console.log("Error in profile", err)
        setSecretMessage('No message for you')
      })
  }, [])
  // })
  console.log("DID WE GET USER DEETS", userDetails)
  // Make Sure there is a user before trying to show their info
  if (!props.user) {
    return <Redirect to="/" />
  }


    // var recipes = userData.recipes
    // console.log(recipes)
    // var display 
    // if(recipes){
    //   display = recipes.map((r) => {
    //     return (
    //       <div>
    //       {r.recipeName}
    //       </div>
    //     )
    //   })
    // }
    // else{
    //   display = "Loading..."
    // }



  // console.log('userData:', userData)

  return (
    <ProfilePage user={props.user} userDetails={userDetails} />
  )
}

export default Profile
