import React from 'react';
import { Container, List, Header, Image } from 'semantic-ui-react';
// import FamilyCircleDetails from '../pages/FamilyCircleDetails'

const FamilyMembers = props => {

    if (!props.familyData.members) {
        return null
    }
    let members = props.familyData.members.map((m) => {
        // let memberPic
        // if (!m.picture){
        //     memberPic = 'http://placekitten.com/200/200'
        // }
        return(

        <List.Item key={m._id} >
           <Image src={m.picture} circular size="tiny"></Image>
           <Header textAlign="center">{m.firstname}</Header>
        </List.Item>
        )

    })
    let creatorPic

    if (!props.familyData.creatorId){
        return null
    }
    if (!props.familyData.creatorId.picture){
        creatorPic = 'http://placekitten.com/200/200'
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