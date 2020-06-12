import React from 'react';
import { Container, Icon, Item, List, Grid, Loader } from 'semantic-ui-react';
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

        <List.Item key={fam._id._id}>
            <Icon name='users' />
            <List.Content>
                <List.Header as={Link} to={`/familycircle/${fam._id._id}`}>{fam._id.familyName}</List.Header>
                {fam.userRole == 'creator' ? <List.Description>Family Token: {fam._id.familyToken}</List.Description> : ''}
                <Item.Meta>Country Origin: {fam._id.countryOrigin}</Item.Meta>
                
            </List.Content>
        </List.Item>
    )
    })
    return (
        // <div>
        //     {family}
        // </div>

        <Container className="top-spacing">
            <Grid columns={2} divided>
                <Grid.Row>
                    <Grid.Column >
                        <Item.Group>
                        <Item>
                            <Item.Image size='small' src='http://placekitten.com/200/200' circular />
                            <Item.Content verticalAlign="middle">
                                <Item.Meta>
                                    {/* <span className='email'>{props.userDetails.email}</span> */}
                                </Item.Meta>
                                {/* <Item.Description>{props.userDetails.bio ? props.userDetails.bio : "A little bit about me ..."}</Item.Description> */}
                            </Item.Content>
                        </Item>
                        </Item.Group>
                    </Grid.Column>
                    <Grid.Column>
                        <h2>Family Circles</h2>
                        {/* <FamilyMembers userDetails={props.userDetails} /> */}
                        {family}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            {/* <UserRecipes userDetails={props.userDetails} /> */}
        </Container>
    )
}

export default FamilyCirclesPage