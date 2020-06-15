import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom'
// import FamilyCircle from './FamilyCircle'
import { Container, Grid, Item, Header } from 'semantic-ui-react'
import RecipeCards from '../components/RecipeCards'
import FamilyMembers from '../components/FamilyMembers'

const FamilyCircleDetails = props => {
    let [familyData, setFamilyData] = useState([])
    let [secretMessage, setSecretMessage] = useState('')
    let { id } = useParams()
    useEffect(() => {
        //Get the token from local storage
        let token = localStorage.getItem('boilerToken')
        fetch(process.env.REACT_APP_SERVER_URL + 'family/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log('Response:', response)
                if (!response.ok) {
                    setSecretMessage('Invalid')
                    return
                }
                //if response is good
                response.json()
                    .then(result => {
                        setFamilyData(result)
                        console.log(result)
                    })
                    .catch((innErr) => {
                        console.log('Error in RecipeDetails:', innErr)
                        setSecretMessage(innErr)
                    })
            })
            .catch((err) => {
                setSecretMessage(err)
                console.log(secretMessage)
            })
    }, []);
    if (!props.user) {
        return (
        <Redirect to="/" />
        )
      }
    return (

        <Container className="top-spacing-2">
            <Grid columns={2}  divided stackable>
                <Grid.Column width={4}>
                    <Header as="h1">{familyData.familyName} Family</Header>
                    <Item.Content>Country of Origin: {familyData.countryOrigin}</Item.Content>
                </Grid.Column>
                <Grid.Column width={12}>
                    
                    <p> {familyData.familyStory}</p>
                    </Grid.Column>
            </Grid>
            <Grid.Row className="top-spacing">
                <Header>Members</Header>
            </Grid.Row>
            <Grid.Row>
                <FamilyMembers familyData={familyData} />
            </Grid.Row>
            <RecipeCards familyData={familyData} />
        </Container>
    )
}

export default FamilyCircleDetails