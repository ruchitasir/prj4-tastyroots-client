import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom'
import { Button, Card, Container, Header, Icon, Image, List } from 'semantic-ui-react'
// import RecipeDetails from './RecipeDetails'

const Recipe = props => {
    let [recipeData, setRecipeData] = useState([])
    let [secretMessage, setSecretMessage] = useState('')
    useEffect(() => {
        // Get the token from local storage
        let token = localStorage.getItem('boilerToken')
        fetch(process.env.REACT_APP_SERVER_URL + 'recipe/public', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log('Response', response)
                if (!response.ok) {
                    setSecretMessage('Invalid')
                    return
                }
                //if Response is good
                response.json()
                    .then(result => {
                        setRecipeData(result)
                        console.log(result)
                    })
                    .catch((innErr) => {
                        console.log('Error in Recipe:', innErr)
                        setSecretMessage(innErr)
                    })
            })
            .catch((err) => {
                console.log(err)
            })

    }, [])
    //Make sure there is a user before displaying public recipes
    if (!props.user) {
        return <Redirect to="/" />
    }

    var recipes = recipeData
    console.log('Recipes:', recipes)
    console.log('Recipe Data:', recipeData)
    var display
    if (recipes) {
        console.log(recipes)
        display = recipes.map((r) => {
            return (
                
                <Card key={r._id}>
                     {(!r.pictures || r.pictures.length < 1) ? <Image src={'./ingredients.jpg'} wrapped /> : <Image src={r.pictures[0]} wrapped />}
                <Card.Content>
                        <Card.Header textAlign="center"><Link to={`/recipe/${r._id}`}>{r.recipeName}</Link></Card.Header>
                        <Card.Meta><span className = 'date'>{r.datePosted}</span></Card.Meta>
                        <Card.Description>{r.description}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Icon name='user' />Serves {r.servings}
                    </Card.Content>
                </Card>
               
            )
        })
    }
    else {
        display = "Loading..."
    }

    return (
        <Container>
            <Header as="h2" dividing>Community Recipes</Header>
            <Card.Group itemsPerRow="4">
            {display}
            </Card.Group>
        </Container>

    )
}

export default Recipe