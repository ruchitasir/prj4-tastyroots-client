import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import { Button, Checkbox, Container, Divider, Grid, Header, Image, List, Message, Radio } from 'semantic-ui-react'
import RecipeDetailsSnap from '../components/RecipeDetailsSnap'
import ShareWith from '../components/ShareWith'
import RecipeTwist from '../components/RecipeTwist'


const RecipeDetails = props => {
    let [recipeData, setRecipeData] = useState([])
    let [secretMessage, setSecretMessage] = useState('')
    let [userDetails, setUserDetails] = useState(null)
    let [userFamilies, setUserFamilies] = useState([])
    let [sharedWith, setSharedWith] = useState([])
    let [share, setShare] = useState(false)
    let [updateShare, setUpdateShare] = useState(false)
    let [updateTwist, setUpdateTwist] = useState(false)
    let { id } = useParams()

    //Fetch recipe details
    useEffect(() => {
        //Get the token from local storage
        let token = localStorage.getItem('boilerToken')
        fetch(process.env.REACT_APP_SERVER_URL + 'recipe/' + id, {
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
                        setRecipeData(result)
                        setSharedWith(result.sharedWith)
                        // setPublicState(result.public)
                        console.log(result)
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

    }, [updateShare,updateTwist])

    //Fetch user details
    useEffect(() => {
        // Get the token from local storage
        let token = localStorage.getItem('boilerToken')
        // Make a call to a protected route
        fetch(process.env.REACT_APP_SERVER_URL + 'profile', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log('Response', response)
                // if not a good response
                if (!response.ok) {
                    return
                }
                // If we get a good response, set the user details
                response.json()
                    .then(result => {
                        setUserDetails(result)
                        setUserFamilies(result.families)
                    })
            })
            .catch(err => {
                console.log("Error in profile", err)
            })
    }, [updateShare,updateTwist])

    if (!recipeData.creatorId) {
        return null
    }
    var recipeIngredients = recipeData.ingredients
    var displayIngredients
    if (recipeIngredients) {
        displayIngredients = recipeIngredients.map((i) => {
            return (
                <List key={i._id}>{i.qty} {i.unit} {i.name}</List>
            )
        })
    }
    var steps = recipeData.steps
    var instructions
    if (steps) {
        instructions = steps.map((s) => {
            return (
                <List.Item as="li" key={steps.indexOf(s)}>{s}</List.Item>
            )
        })
    }
  

    //********************* Recipe Sharing ************************************
    // If the logged in user is the recipe creator, allow sharing with family circles
    //Toggle sharing popup
    var shareRecipe = () => {
        share ? setShare(false) : setShare(true)
        console.log('share is', share)
    }
    if (!props.user){
        return null
    }
    
    return (
        <Container>
            <Header as="h1">{recipeData.recipeName}</Header>
            <Grid stackable>
                <Grid.Row>
                    <Grid.Column width={6}>
                        <RecipeDetailsSnap recipeData={recipeData} />
                    </Grid.Column>
                    <Grid.Column width={6}>{recipeData.description ? <p className="top-spacing-2">{recipeData.description}</p>: ''} </Grid.Column>
                    <Grid.Column width={4}>
                        {(!recipeData.pictures || recipeData.pictures.length < 1) ? <Image src='https://res.cloudinary.com/tasty-roots/image/upload/v1592210962/tasty-roots/hnipqqbegokxfutoghnz.jpg' wrapped className="recipePic" /> : <Image src={recipeData.pictures[0]} wrapped className="recipePic" />}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row className="top-spacing" centered>
                    <Divider horizontal />
                    <Button size="tiny" className="btn-outline" as={Link} to={`/recipe/${recipeData._id}/twist`} >Add Twist</Button>
                    {(props.user._id === recipeData.creatorId._id) ? <Button onClick={shareRecipe} size="tiny" className="btn-outline">Share Recipe</Button> : null}
                </Grid.Row>
                {share ? <ShareWith share={share} setShare={setShare} recipeData={recipeData} userFamilies={userFamilies}
                    sharedWith={sharedWith} userDetails={userDetails} updateShare={updateShare} 
                    setUpdateShare={setUpdateShare}/> : ''}
                <Divider horizontal />
                <Grid.Row>
                    <Grid.Column width={8}>
                        <h3>Ingredients</h3>
                        {displayIngredients}
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <h3>Instructions</h3>
                        <List as="ol">{instructions}</List>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <RecipeTwist recipeId={recipeData._id} updateTwist={updateTwist} setUpdateTwist={setUpdateTwist}/>
                </Grid.Row>
            </Grid>
        </Container>
    )
}

export default RecipeDetails