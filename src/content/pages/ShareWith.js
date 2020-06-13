import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Container, Header } from 'semantic-ui-react';


const ShareWith = props => {
    let [userDetails, setUserDetails] = useState(null)
    let [families, setFamilies] = useState()
    let [recipeData, setRecipeData] = useState([])
    let [secretMessage, setSecretMessage] = useState('')
    let { id } = useParams()
    //Fetch user details
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

    //Fetch recipe details
    useEffect(() => {
        //Get the token from local storage
        let token = localStorage.getItem('boilerToken')
        fetch(process.env.REACT_APP_SERVER_URL + 'recipe/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log('Response:', response)
                if (!response.ok) {
                    setSecretMessage('Invalid')
                    return
                }
                //if response is good
                response.json()
                    .then(result => {
                        setRecipeData(result)
                        console.log(result)
                    })
                    .catch((innErr) => {
                        console.log('Error in RecipeDetails:', innErr)
                        setSecretMessage(innErr)
                    })
            })
            .catch((err) => {
                setSecretMessage(err)
                console.log(err)
            })
    }, [])

    if (!recipeData.creatorId) {
        return null
    }

    console.log("WHERE THEM RECIPE DETAILS", families)

    return (
        <Container>
            <Header as="h1" dividing>Recipe Sharing </Header>


        </Container>
    )
}

export default ShareWith