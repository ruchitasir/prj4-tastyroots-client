import React from 'react';
import { Container, Divider, Header, Icon, Image, Item, List, Grid, Loader, Segment } from 'semantic-ui-react';
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
                    <List.Content key={fam._id}>
                        <List.Header as={Link} to={`/family/${fam._id._id}`}>{fam._id.familyName}</List.Header>
                        <Item.Meta><Icon name='user circle' />{fam.userRole}</Item.Meta>
                        {fam.userRole === 'creator' ? <List.Description> <Icon name='lock' />Family Token: {fam._id.familyToken}</List.Description> : ''}
                        <Item.Meta><Icon name="globe" />Country of Origin: {fam._id.countryOrigin}</Item.Meta>
                        <Item.Meta><Icon name="spoon" />{fam._id.familyStory}</Item.Meta>
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
                        <Image attached src="http://placekitten.com/300/300"/>
                        <Segment raised>Good food has a way of bringing families together. Every gathering, every meal and every special occasion- family history is made. What are some of your fond memories with your family? Share your creations with a family circle of your choosing.
                        <br/>
                        {/* <Segment.Inline>
                        <FamilyAddModal userDetails={props.userDetails} />
                        <FamilyCircleJoin />
                        </Segment.Inline> */}
                        <Grid.Row columns={2} widths="equal" className="top-spacing" centered>
                                <Grid.Column className="btn-pair">                                
                                <FamilyAddModal userDetails={props.userDetails} />
                                    <FamilyCircleJoin />
                                </Grid.Column>
                            </Grid.Row>
                        </Segment>
                    </Grid.Column>
                    {/* <FamilyMembers userDetails={props.userDetails} /> */}
                </Grid.Row>

                <Divider horizontal>
                    <Header as='h4'><Icon name='users' />Your Family Circle</Header>
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