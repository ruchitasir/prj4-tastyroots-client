import React from 'react';
import { Container, Header, Icon, Item, List, Grid, Loader } from 'semantic-ui-react';
import {Link} from 'react-router-dom'
import FamilyCircle from '../pages/FamilyCircle'

const FamilyCirclesPage = props => {
    if (!props.userDetails) {
        return (
            <div>
                <Loader />
            </div>
        )
    }
    console.log(props.userDetails)
    if (!props.userDetails.families){
        return null
    }
    let family = props.userDetails.families.map(fam => {
    return (
        <List key={fam._id._id}>
        <List.Item>
            <Icon name='users' />
            <List.Content key={fam._id}>
                <List.Header as={Link} to={`/family/${fam._id._id}`}>{fam._id.familyName}</List.Header>
                <Item.Meta>{fam.userRole}</Item.Meta>
                {fam.userRole == 'creator' ? <List.Description>Family Token: {fam._id.familyToken}</List.Description> : ''}
                <Item.Meta>Country of Origin: {fam._id.countryOrigin}</Item.Meta>
                <Item.Meta>{fam._id.familyStory}</Item.Meta>
                
            </List.Content>
        </List.Item>
        <div className="ui divider"></div>
        </List>
    )
    })
    // if (!props.userDetails.families._id.recipes){
    //     return null
    // }
    // console.log(props.userDetails.families._id.recipes)

    return (
        // <div>
        //     {family}
        // </div>

        <Container className="top-spacing">
            <Grid>
                <Grid.Row>
                    
                    <Grid.Column>
                        <Header as="h1" dividing>Family Circles</Header>
                        {/* <FamilyMembers userDetails={props.userDetails} /> */}
                        {family}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>

                </Grid.Row>
            </Grid>
            {/* <UserRecipes userDetails={props.userDetails} /> */}
        </Container>
    )
}

export default FamilyCirclesPage