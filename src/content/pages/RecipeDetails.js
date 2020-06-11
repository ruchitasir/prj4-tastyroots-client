import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom'
import { Button, Container, Grid, Image, List, Message } from 'semantic-ui-react'

const RecipeDetails = props => {
    let [recipeData, setRecipeData] = useState([])
    let [secretMessage, setSecretMessage] = useState('')
    let { id } = useParams()
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

    if (!recipeData.creatorId){
        return null
    }
    

    var recipeIngredients = recipeData.ingredients
    var displayIngredients
    if (recipeIngredients){
        displayIngredients = recipeIngredients.map((i) => {
            return(
            <List key={i._id}>{i.qty} {i.unit} {i.name}</List>
            )
        })
    }

    var steps = recipeData.steps
    var instructions
    if (steps){
        instructions = steps.map((s) => {
            return(
                <List.Item as="li" key={steps.indexOf(s)}>{s}</List.Item>
            )
        })
    }
    
    var creatorName = recipeData.creatorId.firstname
 
    return (
        <Container>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <Grid.Row><h1>{recipeData.recipeName}</h1></Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Image src="#" alt="creator image" avatar />
                                <span>{recipeData.creatorId.firstname}</span>
                            </Grid.Column>
                            <Grid.Column></Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={5}>Prep Time: {recipeData.prepTime} Hours</Grid.Column>
                            <Grid.Column width={5}>Cook Time: {recipeData.cookTime} Hours</Grid.Column>
                            <Grid.Column width={5}>Serves {recipeData.servings}</Grid.Column>
                        </Grid.Row>
                        <Grid.Row><Button>Add Twist</Button></Grid.Row>

                    </Grid.Column>
                    <Grid.Column width={8}><Image src={recipeData.pictures} alt="image" /></Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={8}>
                        <h3>Ingredients</h3>
                        {displayIngredients}
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <h3>Instructions</h3>
                        <List as="ol">{instructions}</List>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )
}

export default RecipeDetails