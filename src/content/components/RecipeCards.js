import React from 'react';
import { Link } from 'react-router-dom'
import FamilyCircleDetails from '../pages/FamilyCircleDetails'
import { Card, Container, Header, Icon, Image, Grid } from 'semantic-ui-react'
import Moment from 'moment'

const RecipeCards = props => {
    if (!props.familyData.familyRecipes) {
        return null
    }
    let recipe = props.familyData.familyRecipes.map((r) => {
        let recipeDate = Moment(r.datePosted).format('MM/DD/YYYY')
        return (

            <Grid.Column>
                <Card key={r._id}>
                    {(!r.pictures || r.pictures.length < 1) ? <Image src='./ingredients.jpg' wrapped /> : <Image src={r.pictures[0]} wrapped />}
                    <Card.Content>
                        <Card.Header as={Link} to={`/recipe/${r._id}`}>{r.recipeName}</Card.Header>
                        <Card.Meta>
                            <span className='date'>{recipeDate}</span>
                        </Card.Meta>
                        <Card.Description>
                            {r.description}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Icon name='user' />Serves {r.servings}
                    </Card.Content>
                </Card>
            </Grid.Column>

        )
    })

    if (props.familyData.familyRecipes.length < 1) {
        return (
            <Container className="top-spacing-2" >
                <Header as="h2" dividing>Family Recipes</Header>
                <p>No recipes created yet.</p>
            </Container>
        )
    }
    return (
        <Container className="top-spacing-2">
            <Header as="h2" dividing>Family Recipes</Header>
            <Grid columns='equal' stackable>
                <Grid.Row>
                    {recipe}
                </Grid.Row>
            </Grid>

        </Container>
    )
}

export default RecipeCards


