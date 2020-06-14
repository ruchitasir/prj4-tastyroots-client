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
    let { id } = useParams()

    //Fetch recipe details
    // let [checked, setChecked] = useState(false)
    // let [publicState, setPublicState] = useState()
    // let [radiostate, setRadioState] = useState()
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
    }, [updateShare])

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
    }, [updateShare])

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
    // var creatorName = recipeData.creatorId.firstname
    // console.log('checked', checked)

    // const handleToggle = (e) => {
    //     console.log(e)
    //     setChecked(!checked)
    //     // let token = localStorage.getItem('boilerToken')
    //     // console.log(e)
    //     // fetch(process.env.REACT_APP_SERVER_URL + 'recipe/' + id, {
    //     //     method: 'PUT',
    //     //     headers: {
    //     //         'Content-Type': "application/json",
    //     //         'Authorization': `Bearer ${token}`
    //     //     }
    //     // })
    //     //     .then(response => {
    //     //         console.log('Response:', response)
    //     //         if (!response.ok) {
    //     //             setSecretMessage('Invalid')
    //     //             return
    //     //         }
    //     //         //if response is good
    //     //         response.json()
    //     //             .then(result => {
    //     //                 setRecipeData(result)
    //     //                 console.log(result)
    //     //             })
    //     //             .catch((innErr) => {
    //     //                 console.log('Error in RecipeDetails:', innErr)
    //     //                 setSecretMessage(innErr)
    //     //             })
    //     //     })
    //     //     .catch((err) => {
    //     //         setSecretMessage(err)
    //     //         console.log(err)
    //     //     })

    //     if (checked){
    //     // toggleMsg = 'Public'
    //     radioState = (<Radio toggle label="Public" onChange={(e) => handleToggle(checked} checked/>)
    //     // setRadioState(radioState)
    //     }
    //     else{
    //         radioState = (<Radio toggle label="Private" onChange={(e) => setChecked(e.currentTarget.value)} />)
    //         // toggleMsg = 'Private'
    //     }
    // }
    // // let toggleMsg
    // var radioState = (<Radio toggle label="Public" onClick={handleToggle} value={checked} checked/>)
    
    
    
    // if (checked ? toggleMsg = 'Public' : toggleMsg = 'Private')
    



    //********************* Recipe Sharing ************************************
    // If the logged in user is the recipe creator, allow sharing with family circles
    // if (props.user._id === recipeData.creatorId) {
    //     var shareBtn =  (
    //     <Button onClick={shareRecipe} size="tiny" basic color="teal">Share Recipe</Button>
    //     )
    // }
    //Toggle sharing popup
    var shareRecipe = () => {
        share ? setShare(false) : setShare(true)
        console.log('share is', share)
    }

    return (
        <Container>
            <Grid >
                <Grid.Row>
                    <Grid.Column width={8}>
                        <Grid.Row><h1>{recipeData.recipeName}</h1></Grid.Row>
                        <Grid.Row>
                         {/* {radioState} */}
                         {/* <Radio toggle label={toggleMsg} onChange={(e) => setChecked(e.target.value)} defaultChecked/> */}
                    </Grid.Row>
                        <RecipeDetailsSnap recipeData={recipeData} />
                    </Grid.Column>
                    <Grid.Column width={8}>{(!recipeData.pictures || recipeData.pictures.length < 1) ? <Image src={'http://placekitten.com/400/200'} wrapped /> : <Image src={recipeData.pictures[0]} wrapped />}</Grid.Column>
                </Grid.Row>
                <Grid.Row className="top-spacing" centered>
                    <Divider horizontal />
                    <Button size="tiny" basic color="teal">Add Twist</Button>
                    {(props.user._id === recipeData.creatorId) ? <Button onClick={shareRecipe} size="tiny" basic color="teal">Share Recipe</Button> : null}
                </Grid.Row>
                {share ? <ShareWith recipeData={recipeData} userFamilies={userFamilies}
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
                    <RecipeTwist />
                </Grid.Row>
            </Grid>
        </Container>
    )
}

export default RecipeDetails