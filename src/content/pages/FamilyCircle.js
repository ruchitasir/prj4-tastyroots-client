import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom'
import FamilyCirclesPage from '../components/FamilyCirclesPage'
import TopButton from '../components/TopButton'
// import FamilyCircleDetails from '../components/FamilyCircleDetails'

const FamilyCircle = props => {
  let [userDetails, setUserDetails] = useState(null)
  let [refreshPage, setRefreshPage] = useState(false)

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
  }, [refreshPage])

  if (!props.user) {
    return <Redirect to="/" />
  }

  return (
    <div>
      <FamilyCirclesPage user={props.user} userDetails={userDetails} setRefreshPage={setRefreshPage} />
      <TopButton />
    </div>
  )
}

export default FamilyCircle


