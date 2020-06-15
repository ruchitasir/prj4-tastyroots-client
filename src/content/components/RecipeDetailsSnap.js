import React from 'react';
import RecipeDetails from '../pages/RecipeDetails'
import { Container, Grid, Image, Label } from 'semantic-ui-react'
import Moment from 'moment'

const RecipeDetailsSnap = props => {

    let defaultImg = <Image src='./beet_circle.png'/>
    if (props.recipeData.creatorId.picture) {
        defaultImg = props.recipeData.creatorId.picture
    }
    let recipeDate = Moment(props.recipeData.datePosted).format('MM/DD/YYYY')

    return (

        <Container>
            {/* <Image src={defaultImg} avatar className="top-spacing" /> */}
            <div className="name-date top-spacing">
                <Label basic image>
                    <img src={defaultImg} />{props.recipeData.creatorId.firstname}
                </Label>
                <Label>{recipeDate}</Label>
            </div>
            <Grid columns={3} divided textAlign='center' >
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