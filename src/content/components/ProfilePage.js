import React from 'react';
import { Container, Item, Grid, Loader } from 'semantic-ui-react';
import UserFamily from './UserFamily'
import UserRecipes from './UserRecipes';
import UserFromDB from '../components/UserFromDB'

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
                    <Grid.Column>
                        <UserFromDB/>
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