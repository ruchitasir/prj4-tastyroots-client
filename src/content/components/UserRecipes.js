import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Container, Divider, Icon, Image, Header, Grid } from 'semantic-ui-react';
import RecipeAddModal from './RecipeAddModal'
import Moment from 'moment'

const UserRecipes = props => {

    // let defaultImageArr = [

    //     // 'https://res.cloudinary.com/tasty-roots/image/upload/v1592160517/tasty-roots/vykzrh9lnhk25axpku2j.jpg',
    //     'https://res.cloudinary.com/tasty-roots/image/upload/v1592161032/tasty-roots/dsajyspmwi63hbrucebz.jpg'
    //     // 'https://res.cloudinary.com/tasty-roots/image/upload/v1592161120/tasty-roots/rt4dyiaqxia9shzup9md.jpg',
    //     // 'https://res.cloudinary.com/tasty-roots/image/upload/v1592161324/tasty-roots/wphj0nie7cyy56kff9ex.jpg',
    //     // 'https://res.cloudinary.com/tasty-roots/image/upload/v1592161406/tasty-roots/zqlmrmadu0fa2edexuwq.png',
    //     // 'https://res.cloudinary.com/tasty-roots/image/upload/v1592161777/tasty-roots/tsuzpiavicimssdb7tft.jpg',
    //     // 'https://res.cloudinary.com/tasty-roots/image/upload/v1592161929/tasty-roots/drjgcu4xvqs57yxkmaxy.jpg',
    //     // 'https://res.cloudinary.com/tasty-roots/image/upload/v1592162398/tasty-roots/lqrazeqnisqlpqpsbdni.jpg',
    //     // 'https://res.cloudinary.com/tasty-roots/image/upload/v1592162536/tasty-roots/cijg4nzovudo1tgomooi.jpg'
    // ]
    // let randoNum = Math.floor(Math.random() * defaultImageArr.length)
    // let defaultImg = defaultImageArr[randoNum]

    let recipe = props.userDetails.recipes.map(r => {
        let recipeDate = Moment(r.datePosted).format('MM/DD/YYYY')
        return (
            <Card key={r._id}>
                {(!r.pictures || r.pictures.length < 1) ? <Image src='https://res.cloudinary.com/tasty-roots/image/upload/v1592161032/tasty-roots/dsajyspmwi63hbrucebz.jpg' wrapped /> : <Image src={r.pictures[0]} wrapped />}
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
        )
    })

    if (props.userDetails.recipes.length < 1) {
        return (
            <Container className="top-spacing-2" stackable>
                <Grid>
                <Grid.Row>
                    <Grid.Column width={14}>
                        <Header as="h2" dividing>My Recipes</Header>
                    </Grid.Column>
                    <Grid.Column  position="right" width={2}>
                        <RecipeAddModal textAlign="right" userDetails={props.userDetails} updateState = {props.updateState} setUpdateState={props.setUpdateState} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
                <p className="top-spacing">No recipes created yet.</p>
            </Container>
        )
    }
    return (
        <Container className="top-spacing-2">
            <Grid>
                <Grid.Row>
                    <Grid.Column width={14}>
                        <Header as="h2">My Recipes</Header>
                        <Divider />
                    </Grid.Column>
                    <Grid.Column  position="right" width={2}>
                        <RecipeAddModal textAlign="right" userDetails={props.userDetails} updateState = {props.updateState} setUpdateState={props.setUpdateState}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Card.Group centered>
                {recipe}
            </Card.Group>
        </Container>
    )
}

export default UserRecipes