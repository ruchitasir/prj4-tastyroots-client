import React from 'react';
import { Container, Item, Loader, Segment } from 'semantic-ui-react';
import UserRecipes from './UserRecipes';

const ProfilePage = props => {
    if (!props.userDetails) {
        return (
            <Segment>
                <Loader />
            </Segment>
        )
    }
    return (
        <Container className="top-spacing">
            <Item.Group>
                <Item>
                    <Item.Image size='small' src='http://placekitten.com/200/200' circular />
                    <Item.Content verticalAlign='middle'>
                        <Item.Header>{props.user.firstname} {props.user.lastname}</Item.Header>
                        <Item.Meta>
                            <span className='email'>{props.userDetails.email}</span>
                        </Item.Meta>
                        <Item.Description>{props.userDetails.bio ? props.userDetails.bio : "A little bit about me ..."}</Item.Description>
                    </Item.Content>
                </Item>
            </Item.Group>
            <UserRecipes userDetails={props.userDetails}/>
        </Container>
    )
}

export default ProfilePage