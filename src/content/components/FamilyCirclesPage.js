import React from 'react';
import { Container, Divider, Icon, Item, List, Grid, Loader } from 'semantic-ui-react';
import {Link} from 'react-router-dom'

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
        <List>
        <List.Item key={fam._id._id}>
            <Icon name='users' />
            <List.Content>
                <List.Header as={Link} to={`/familycircle/${fam._id._id}`}>{fam._id.familyName}</List.Header>
                <Item.Meta>{fam.userRole}</Item.Meta>
                {fam.userRole == 'creator' ? <List.Description>Family Token: {fam._id.familyToken}</List.Description> : ''}
                <Item.Meta>Country of Origin: {fam._id.countryOrigin}</Item.Meta>
                <Item.Meta>{fam._id.familyStory}</Item.Meta>
                
            </List.Content>
        </List.Item>
        <div class="ui divider"></div>
        </List>
    )
    })
    console.log(props.userDetails.families)
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
                        <h1>Family Circles</h1>
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