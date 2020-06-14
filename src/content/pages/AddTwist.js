import React, { useEffect, useState } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom'
import { Container, Form, Input } from 'semantic-ui-react';


const AddTwist = props => {
    let { id } = useParams()
    let [recipeData, setRecipeData] = useState([])
    let [secretMessage, setSecretMessage] = useState()

    let [recipeName, setRecipeName] = useState()
    let [description, setDescription] = useState()
    let [servings, setServings] = useState(2)
    let [prepTime, setPrepTime] = useState()
    let [cookTime, setCookTime] = useState()

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

    return (

        <Container>
            <Form.Group>
                <Form.Field>
                    <label>Name</label>
                    <Form.Input placeholder={recipeData.recipeName} onChange={(e) => setRecipeName(e.target.value)} required />
                </Form.Field>
            </Form.Group>
            <Form.Group>
                <Form.Field>
                    <label>Servings</label>
                    <Form.Input placeholder={recipeData.servings}></Form.Input>
                </Form.Field>
            </Form.Group>
        </Container>
    )

}

export default AddTwist