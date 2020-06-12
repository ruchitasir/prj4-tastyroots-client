import React from 'react';
<<<<<<< HEAD
import { Container, Item, Grid, Loader } from 'semantic-ui-react';
import UserFamily from './UserFamily'
import UserRecipes from './UserRecipes';
=======
import { Container, Loader, Segment  } from 'semantic-ui-react';
import RecipeAddModal from '../components/RecipeAddModal'
>>>>>>> 8dd2b0a7fcf84c7222acc9e4881acb6b9efd0eac

const ProfilePage = props => {
    if (!props.userDetails) {
        return (
            <div>
                <Loader />
            </div>
        )
    }
    return (
        <Container className="top-spacing">
            <Grid columns={2} divided>
                <Grid.Row>
                    <Grid.Column >
                        <Item.Group>
                        <Item>
                            <Item.Image size='small' src='http://placekitten.com/200/200' circular />
                            <Item.Content verticalAlign="middle">
                                <h1>{props.user.firstname} {props.user.lastname}</h1>
                                <Item.Meta>
                                    <span className='email'>{props.userDetails.email}</span>
                                </Item.Meta>
                                <Item.Description>{props.userDetails.bio ? props.userDetails.bio : "A little bit about me ..."}</Item.Description>
                            </Item.Content>
                        </Item>
                        </Item.Group>
                    </Grid.Column>
                    <Grid.Column>
                        <UserFamily userDetails={props.userDetails} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <UserRecipes userDetails={props.userDetails} />
        </Container>
    )
}

export default ProfilePage