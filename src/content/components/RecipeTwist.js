import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import {  Container, Header, Icon, Image, Card, Button } from 'semantic-ui-react'

const RecipeTwist = props => {
    let [recipeTwist, setRecipeTwist] = useState()
    let [secretMessage, setSecretMessage] = useState()
    let { id } = useParams()

    useEffect(() => {
        //Get the token from local storage
        let token = localStorage.getItem('boilerToken')
        fetch(process.env.REACT_APP_SERVER_URL + 'recipe/twist/' + props.recipeId, {
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
                        setRecipeTwist(result)
                        setSecretMessage(result)
                        console.log('Twist Results:', result)
                    
                    })
                    .catch((innErr) => {
                        console.log('Error in RecipeDetails:', innErr)
                        setSecretMessage(innErr)
                    })
            })
            .catch((err) => {
                setSecretMessage(err)
                console.log(err)
            })
        
    }, [])

    const handleTwistLink =()=>{
        props.updateTwist ? props.setUpdateTwist(false) : props.setUpdateTwist(true)
    }


    if (!recipeTwist){
        return null
    }
    
    let display = recipeTwist.map((r) => {
        return (

        <Card key={r._id}>
                {(!r.pictures || r.pictures.length < 1) ? <Image src='
https://res.cloudinary.com/tasty-roots/image/upload/v1592124358/tasty-roots/ow5zjggogrej4qcal99e.jpg' wrapped /> : <Image src={r.pictures[0]} wrapped />}
                <Card.Content>
                    {/* <Card.Header as={Link} to={`/recipe/${r._id}`}> */}
                    <Card.Header>
                        <Button size="tiny" className="btn-outline" as={Link} to={`/recipe/${r._id}`} onClick={handleTwistLink}>
                            {r.recipeName}
                        </Button>
                    </Card.Header>
                    <Card.Meta>
                        <span className='date'>{r.datePosted}</span>
                    </Card.Meta>
                    <Card.Description>
                        {r.description}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Icon name='user' />Serves {r.servings}
                </Card.Content>
            </Card>
        )
    })

        return (
            <Container>
                <Header as='h2' dividing className="top-spacing">Twists</Header>
                <Card.Group centered>{display}</Card.Group>
            </Container>
        )

   
}

export default RecipeTwist