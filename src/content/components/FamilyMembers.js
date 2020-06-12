import React from 'react';
import { Container, List, Header, Image } from 'semantic-ui-react';
import FamilyCircleDetails from '../pages/FamilyCircleDetails'

const FamilyMembers = props => {

    if (!props.familyData.members) {
        return null
    }
    let members = props.familyData.members.map((m) => {
        return(

        <List.Item key={m._id} >
           <Image src={m.picture} circular size="tiny"></Image>
           <Header textAlign="center">{m.firstname}</Header>
        </List.Item>
        )

    })

    if (!props.familyData.creatorId){
        return null
    }

    return (

        <Container>
        <List horizontal>
        <List.Item>
                    <Image src={props.familyData.creatorId.picture} circular size="tiny"/>
                    <Header textAlign="center">{props.familyData.creatorId.firstname}</Header>
                    </List.Item>
            {members}
        </List>
        </Container>
    )
}

export default FamilyMembers