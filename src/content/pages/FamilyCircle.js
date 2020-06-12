import React, {useEffect, useState} from 'react';
import { Link, Redirect } from 'react-router-dom'
import FamilyCirclesPage from '../components/FamilyCirclesPage'
import { List, Icon } from 'semantic-ui-react'

const FamilyCircle = props => {
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
                console.log(result)
                
              })
          })
          .catch(err => {
            console.log("Error in profile", err)
          })
      }, [])
    
    if (!props.user) {
        return <Redirect to="/" />
    }

    console.log('user-------->',userDetails)
    return (
        <FamilyCirclesPage user={props.user} userDetails={userDetails}/>
        
    )
}

export default FamilyCircle


