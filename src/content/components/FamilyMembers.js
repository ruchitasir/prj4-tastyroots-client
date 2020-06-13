import React from 'react';
import { Container, List, Header, Image } from 'semantic-ui-react';

const FamilyMembers = props => {

    if (!props.familyData.members) {
        return null
    }

    //map through data to render family member profile pic & name
    let members = props.familyData.members.map((m) => {
        let memberPic
        if (!m.picture){
            memberPic = 'http://placekitten.com/200/200'
        }
        else {
            memberPic = m.picture
        }
        return(

        <List.Item key={m._id} >
           <Image src={memberPic} circular size="tiny"></Image>
           <Header textAlign="center">{m.firstname}</Header>
        </List.Item>
        )
    })
    //null check to get creatorId object
    if (!props.familyData.creatorId){
        return null
    }

    //if creator does not have pic, display placeholder image (creator of family is not listed in members, must render image and name separately)
    let creatorPic
    if (!props.familyData.creatorId.picture){
        creatorPic = 'http://placekitten.com/200/200'
    }
    else {
        creatorPic = props.familyData.creatorId.picture
    }

    return (

        <Container>
        <List horizontal>
        <List.Item>
                    <Image src={creatorPic} circular size="tiny"/>
                    <Header textAlign="center">{props.familyData.creatorId.firstname}</Header>
                    </List.Item>
            {members}
        </List>
        </Container>
    )
}

export default FamilyMembers