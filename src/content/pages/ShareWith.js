import React, { useEffect, useState} from 'react';
import { Container } from 'semantic-ui-react';


const ShareWith = props => {
    let [userDetails, setUserDetails] = useState(null)
    let [families, setFamilies] = useState()
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
                // if not a good response
                if (!response.ok) {
                    return
                }
                // If we get a good response, set the user details
                response.json()
                    .then(result => {
                        setUserDetails(result)
                        setFamilies(result.families)
                    })
            })
            .catch(err => {
                console.log("Error in profile", err)
            })
    }, [])


    return (
        <Container>
            <h1>Who should we share this recipe with? </h1>
        </Container>
    )
}

export default ShareWith