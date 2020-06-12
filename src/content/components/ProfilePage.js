import React from 'react';
import { Container, Item, Grid, Loader } from 'semantic-ui-react';
import UserFamily from './UserFamily'
import UserRecipes from './UserRecipes';


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
                            {props.userDetails.picture ? <Item.Image size='small' src={props.userDetails.picture} circular /> : <Item.Image size='small' src="http://placekitten.com/300/300" circular />}
                            <Item.Content verticalAlign="middle">
                                <h1>{props.userDetails.firstname} {props.userDetails.lastname}</h1>
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