import React from 'react';
import { Container, Divider, Header, Icon, Item, List, Grid, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import FamilyAddModal from '../components/FamilyAddModal'
import FamilyCircleJoin from './FamilyCircleJoin';

const FamilyCirclesPage = props => {
    if (!props.userDetails) {
        return (
            <div>
                <Loader />
            </div>
        )
    }
    if (!props.userDetails.families) {
        return null
    }
    let family = props.userDetails.families.map(fam => {
        return (
            <List key={fam._id._id}>
                <List.Item>
                    <Icon name='heart outline' />
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
        <Container className="top-spacing">
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Header as="h1" dividing>Family Circles</Header>
                    </Grid.Column>
                    {/* <FamilyMembers userDetails={props.userDetails} /> */}
                </Grid.Row>
                <Grid.Row columns={2} widths="equal">
                    <Grid.Column>
                        <FamilyAddModal userDetails={props.userDetails} />
                    </Grid.Column>
                    <Grid.Column>
                        <FamilyCircleJoin />
                    </Grid.Column>
                </Grid.Row>
                <Divider horizontal>
                    <Header as='h4'><Icon name='users'/>Your Family Circle</Header>
                </Divider>
                <Grid.Row>
                    <Grid.Column>
                        {family}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            {/* <UserRecipes userDetails={props.userDetails} /> */}
        </Container>
    )
}

export default FamilyCirclesPage