import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardGroup, Container, Icon, Image, Header, Segment, Grid } from 'semantic-ui-react';
import RecipeAddModal from './RecipeAddModal'

const UserRecipes = props => {
    let recipe = props.userDetails.recipes.map(r => {
        return (
            <Card key={r._id}>
                {(!r.pictures || r.pictures.length < 1) ? <Image src='./ingredients.jpg' wrapped /> : <Image src={r.pictures[0]} wrapped />}
                <Card.Content>
                    <Card.Header as={Link} to={`/recipe/${r._id}`}>{r.recipeName}</Card.Header>
                    <Card.Meta>
                        <span className='date'>{r.datePosted}</span>
                    </Card.Meta>
                    <Card.Description>
                        {r.description}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Icon name='user' />Serves {r.servings}
                </Card.Content>
            </Card>
        )
    })

    if (props.userDetails.recipes.length < 1) {
        return (
            <Container className="top-spacing-2" stackable>
                <Grid clearing>
                <Grid.Row>
                    <Grid.Column width={14}>
                        <Header as="h2" dividing>My Recipes</Header>
                    </Grid.Column>
                    <Grid.Column  position="right" width={2}>
                        <RecipeAddModal textAlign="right" userDetails={props.userDetails} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
                <p className="top-spacing">No recipes created yet.</p>
            </Container>
        )
    }
    return (
        <Container className="top-spacing-2">
            <Grid clearing>
                <Grid.Row>
                    <Grid.Column width={14}>
                        <Header as="h2">My Recipes</Header>
                    </Grid.Column>
                    <Grid.Column  position="right" width={2}>
                        <RecipeAddModal textAlign="right" userDetails={props.userDetails} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <CardGroup itemsPerRow={4}>
                {recipe}
            </CardGroup>
        </Container>
    )
}

export default UserRecipes