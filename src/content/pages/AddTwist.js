import React, { useEffect, useState } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom'
import { Container, Form, Button } from 'semantic-ui-react';


const AddTwist = props => {
    let { id } = useParams()
    let [recipeData, setRecipeData] = useState([])
    let [message, setMessage] = useState()

    let [recipeStatus, setRecipeStatus] = useState(false)
    let [recipeName, setRecipeName] = useState()
    let [description, setDescription] = useState()
    let [servings, setServings] = useState(2)
    let [prepTime, setPrepTime] = useState()
    let [cookTime, setCookTime] = useState()
    let [step, setStep] = useState()
    let [steps, setSteps] = useState([])

    const servingsOptions = [
        { text: '1', value: 1 },
        { text: '2', value: 2 },
        { text: '3', value: 3 },
        { text: '4', value: 4 },
        { text: '5', value: 5 },
        { text: '6', value: 6 },
        { text: '7', value: 7 },
        { text: '8', value: 8 },
        { text: '9', value: 9 },
        { text: '10', value: 10 },
        { text: '11', value: 11 },
        { text: '12', value: 12 }


    ]

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
                    setMessage('Invalid')
                    return
                }
                //if response is good
                response.json()
                    .then(result => {
                        setRecipeData(result)
                        console.log(result)
                        console.log('recipe steps',result.steps)
                        setSteps(result.steps)
                    })
                    .catch((innErr) => {
                        console.log('Error in RecipeDetails:', innErr)
                        setMessage(innErr)
                    })
            })
            .catch((err) => {
                setMessage(err)
                console.log(err)
            })
    }, [])

    const toggleRecipeStatus = (e, data) => {
        setRecipeStatus(data.checked)
    }

    const handleStepChange = (e, index) => {
        steps[index] = e.target.value
        setStep(steps[index])
        setSteps(steps)
    }

    const addSteps = (e) => {
        setSteps([...steps, ''])
    }

    const handleRemoveSteps = (index) => {
        console.log('steps', steps)
        console.log('index to be removed', index)
        console.log('step at index', steps[index])
        let newSteps = [...steps]
        console.log('newsteps', newSteps)
        newSteps.splice(index, 1)
        console.log('newsteps after removal', newSteps)
        setSteps(newSteps)
    }
    let showSteps = ''
    if(steps){
        showSteps =  steps.map((step, ind) => {
            return (
                <Form.Group widths='equal'>
                        <Form.Input  label="Step" name="step" value={step} onChange={(e) => handleStepChange(e, ind)} required />
                        <Form.Button onClick={() => handleRemoveSteps(ind)} className="remove-btn">Remove</Form.Button>
                </Form.Group>
            )
        })

    }
    const handleSubmit = (e) => {
        e.preventDefault()
        let creatorId = props.userDetails._id
      
        console.log('creator Id', creatorId)
        // console.log('Ingredients', ingredients)
        // let ing = ingredients.map((ing) => {
        //     let ingStr = ing.qty + ',' + ing.unit + ',' + ing.name
        //     return ingStr
        // })
        // ingredients = ing
        // console.log('ingredients in string', ingredients)

        let recipePublic = recipeStatus
        console.log('recipe status public', recipeStatus)

        let originalRecipe = recipeData._id
        console.log('original recipe',originalRecipe,recipeData._id)
        if(!recipeName){
            setRecipeName(recipeData.recipeName)
        }
        if(!servings){
            setServings(recipeData.servings)    
        }
        if(!description){
            setDescription(recipeData.description)
        }
        if(!cookTime){
            setCookTime(cookTime)
        }
        if(!prepTime){
            setPrepTime(prepTime)
        }

        let token = localStorage.getItem('boilerToken')
        // fetch(process.env.REACT_APP_SERVER_URL + 'recipe', {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         originalRecipe,
        //         recipeName,
        //         description,
        //         creatorId,
        //         servings,
        //         prepTime,
        //         cookTime,
        //         // ingredients,
        //         steps,
        //         recipePublic
        //     }),
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${token}`
        //     }
        // })
        //     .then(response => {
        //         console.log("Here is the response!", response)
        //         if (!response.ok) {
        //             setMessage(`${response.status} : ${response.statusText}`)
        //             return
        //         }
        //         response.json().then(result => {
        //             console.log("result!", result)

        //         })
        //     })
        //     .catch(err => {
        //         console.log('ERROR SUBMITTING RECIPE ADD FORM', err)
        //     })
        //     .finally(() => {
        //         setRecipeName('')
        //         setDescription('')
        //         setServings('')
        //         setPrepTime('')
        //         setCookTime('')
        //         setSteps([])
        //         // setIngredients([])
        //         // setIngredientName('')
        //         // setIngredientQuantity(0)
        //         // setIngredientUnit('')
        //         // props.updateState ? props.setUpdateState(false) : props.setUpdateState(true)
        //         // document.getElementById("recipeForm").reset();
        //         // setRedirect(true)
               
        //     })
    }

    return (

        <Container>
            <Form onSubmit={(e) => handleSubmit(e)}> 
                    <Form.Field> 
                          <Button color='green' type='submit'>Add twist</Button>
                    </Form.Field>
                <Form.Radio label='Public'
                        onChange={toggleRecipeStatus} toggle />
                <Form.Group widths='equal'>
                    <Form.Field>
                        <Form.Input label='Recipe Name' name= 'recipeName' placeholder={recipeData.recipeName} onChange={(e) => setRecipeName(e.target.value)} required />
                    </Form.Field>
                    <Form.Select fluid required label='Servings' options={servingsOptions} name="servings" onChange={(e, data) => setServings(data.value)} placeholder={recipeData.servings} />
                </Form.Group>
                <Form.Group widths='equal'>
                        <Form.Field>
                            <Form.Input label="Prep Time" name="prepTime" onChange={(e) => setPrepTime(e.target.value)}  placeholder={recipeData.prepTime}/>
                        </Form.Field>
                        <Form.Field>
                            <Form.Input label="Cook Time" name="cookTime" onChange={(e) => setCookTime(e.target.value)} placeholder={recipeData.cookTime}/>
                        </Form.Field>
                </Form.Group>
                <Form.Group widths='equal'>
                        <Form.Field>
                            <Form.TextArea label="Description" name="description" onChange={(e) => setDescription(e.target.value)} placeholder={recipeData.description} required />
                        </Form.Field>           
                </Form.Group>
                <Form.Group widths='equal'>
                    { showSteps    }             
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Field>
                        <Button onClick={(e) => addSteps(e)}>Add steps</Button>
                    </Form.Field>  
                    {/* <Form.Field> 
                          <Button color='green' type='submit'>Add twist</Button>
                    </Form.Field> */}
                </Form.Group>  
            </Form>
        </Container>
    )

}

export default AddTwist