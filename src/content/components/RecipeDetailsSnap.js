import React from 'react';
import RecipeDetails from '../pages/RecipeDetails'
import { Container, Grid, Image } from 'semantic-ui-react'

const RecipeDetailsSnap = props => {
    let defaultImg = 'http://placekitten.com/200/200'
    if (props.recipeData.creatorId.pictures){
        defaultImg = props.recipeData.creatorId.pictures[0]
    }

    return (
        
        <Container>
                <Image src={defaultImg} avatar className="top-spacing"/>
                <span>{props.recipeData.creatorId.firstname}</span>
            <Grid columns={3}>
                <Grid.Row className="top-spacing">
                    <Grid.Column><h3>{props.recipeData.prepTime}</h3>{(parseFloat(props.recipeData.prepTime) > 1) ? 'Hours' : 'Hour'}<br />Prep</Grid.Column>
                    <Grid.Column><h3>{props.recipeData.cookTime}</h3>{(parseFloat(props.recipeData.cookTime) > 1) ? 'Hours' : 'Hour'}<br />Cook</Grid.Column>
                    <Grid.Column><h3>{props.recipeData.servings}</h3><br />Servings</Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )
}

export default RecipeDetailsSnap