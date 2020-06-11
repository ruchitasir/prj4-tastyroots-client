import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardGroup, Container, Icon, Image } from 'semantic-ui-react';
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
            <Container className="top-spacing-2">
                <h2>My Recipes</h2>
                <p>No recipes created yet.</p>
            </Container>
        )
    }
    return (
        <Container className="top-spacing-2">
            <h2>My Recipes</h2>
            <CardGroup itemsPerRow={4}>
                {recipe}
            </CardGroup>
        </Container>
    )
}
export default UserRecipes