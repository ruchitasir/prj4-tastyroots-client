import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom'
import { Container, Form, Button } from 'semantic-ui-react';
import RecipeAddIngredientsModal from '../components/RecipeAddIngredientsModal';
import RecipePics from '../components/RecipePics'
import { CLOUDINARY_DEFAULT_IMG_2 } from '../components/CloudinaryImageConst'

const AddTwist = props => {
    let { id } = useParams()
    let [recipeData, setRecipeData] = useState([])
    let [imageUrl, setImageUrl] = useState('')

    let [message, setMessage] = useState()
    let [redirect, setRedirect] = useState(false)

    let [recipeStatus, setRecipeStatus] = useState(false)
    let [recipeName, setRecipeName] = useState()
    let [description, setDescription] = useState()
    let [servings, setServings] = useState(2)
    let [prepTime, setPrepTime] = useState()
    let [cookTime, setCookTime] = useState()
    let [step, setStep] = useState()
    let [steps, setSteps] = useState([])
    let [ingredients, setIngredients] = useState([])
    let [ingredientName, setIngredientName] = useState()
    let [ingredientUnit, setIngredientUnit] = useState()
    let [ingredientQuantity, setIngredientQuantity] = useState()

  
    

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

    const unitOptions = [
        { text: 'piece', value: 'piece' },
        { text: 'each', value: 'each' },
        { text: 'tsp', value: 'tsp' },
        { text: 'tbsp', value: 'tbsp' },
        { text: 'cup', value: 'cup' },
        { text: 'ounce', value: 'ounce' },
        { text: 'lb', value: 'lb' },
        { text: 'grams', value: 'grams' },
        { text: 'miligrams', value: 'miligrams' },
        { text: 'fluid-ounce', value: 'fluid-ounce' },
        { text: 'fluid-cup', value: 'fluid-cup' },
        { text: 'pint', value: 'pint' },
        { text: 'quart', value: 'quart' },
        { text: 'gallom', value: 'gallon' },
        { text: 'litre', value: 'litre' },
        { text: 'mililitre', value: 'mililitre' },
        { text: 'stick', value: 'stick' },
        { text: 'packet', value: 'packet' },
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
                        if (result) {
                            console.log('recipe steps', result.steps)
                            setSteps(result.steps)
                            setRecipeName(result.recipeName)
                            setServings(result.servings)
                            setDescription(result.description)
                            setCookTime(result.cookTime)
                            setPrepTime(result.prepTime)
                            console.log('recipe status', result.recipePublic)
                            setRecipeStatus(result.recipePublic)
                            setIngredients(result.ingredients)
                        }
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
    if (!props.user) {
        return (
            <Redirect to="/" />
        )
    }

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

    const handleServings = (e, data) => {
        console.log('servings data', data)
        setServings(data.value)
    }

    /*********************   Adding and Removing Ingredient fields on form ********************/
    const handleIngredientQuantityChange = (e, index) => {
        ingredients[index].qty = e.target.value
        setIngredientQuantity(ingredients[index].qty)
        setIngredients(ingredients)
    }

    const handleIngredientUnitChange = (e, data, index) => {
        ingredients[index].unit = data.value
        console.log('options value', data.value)
        setIngredientUnit(ingredients[index].unit)
        setIngredients(ingredients)
    }

    const handleIngredientNameChange = (e, index) => {
        ingredients[index].name = e.target.value
        setIngredientName(ingredients[index].name)
        setIngredients(ingredients)
    }


    const addNewIngredient = () => {
        console.log('clicked for add new ingredient')
        console.log('ingredients', ingredients)
        setIngredients([...ingredients, { qty: 0, unit: '', name: '' }])
    }

    const handleRemoveIngredient = (index) => {
        let newIngredients = [...ingredients]
        newIngredients.splice(index, 1)
        setIngredients(newIngredients)
    }


    let showSteps = ''
    if (steps) {
        showSteps = steps.map((step, ind) => {
            return (
                <Form.Group widths='equal'>
                    <Form.Input label="Step" name="step" value={step} onChange={(e) => handleStepChange(e, ind)} required />
                    <Form.Button onClick={() => handleRemoveSteps(ind)} className="remove-btn">Remove</Form.Button>
                </Form.Group>
            )
        })

    }

    let showPublic = <Form.Radio label='Public' onChange={toggleRecipeStatus} slider />
    if (recipeStatus) {
        showPublic = <Form.Radio label='Public' onChange={toggleRecipeStatus} slider checked />
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let creatorId = props.user._id
        let recipePublic = recipeStatus
        let originalRecipe = recipeData._id

        console.log('Ingredients', ingredients)
        let ing = ingredients.map((ing) => {
            let ingStr = ing.qty + ',' + ing.unit + ',' + ing.name
            return ingStr
        })
        ingredients = ing

        
        console.log('recipe originalRecipe ', originalRecipe)
        console.log('recipe recipeName ', recipeName)
        console.log('recipe description ', description)
        console.log('creator Id', creatorId)
        console.log('recipe servings ', servings)
        console.log('recipe cookTime ', cookTime)
        console.log('recipe prepTime ', prepTime)
        console.log('recipe steps ', steps)
        console.log('recipe status public', recipeStatus)
        console.log('recipe ingredients', ingredients)
        let pictures = [CLOUDINARY_DEFAULT_IMG_2]
        if(imageUrl){
             pictures = [imageUrl]
        }
        console.log('pictures check cloudinary', pictures)
        let token = localStorage.getItem('boilerToken')
        fetch(process.env.REACT_APP_SERVER_URL + 'recipe', {
            method: 'POST',
            body: JSON.stringify({
                originalRecipe,
                recipeName,
                description,
                creatorId,
                servings,
                prepTime,
                cookTime,
                ingredients,
                steps,
                recipePublic, 
                pictures
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log("Here is the response!", response)
                if (!response.ok) {
                    setMessage(`${response.status} : ${response.statusText}`)
                    return
                }
                response.json().then(result => {
                console.log("result!", result)
                    
                })
            })
            .catch(err => {
                console.log('ERROR SUBMITTING RECIPE ADD FORM', err)
            })
            .finally(() => {
                setRecipeName('')
                setDescription('')
                setServings('')
                setPrepTime('')
                setCookTime('')
                setSteps([])
                setIngredients([])
                setIngredientName('')
                setIngredientQuantity(0)
                setIngredientUnit('')
                setRedirect(true)

            })
    }


    if (redirect) {
        return <Redirect to={`/recipe/${recipeData._id}`} />
       
    }

    return (

        <Container>
            <Form>
                {showPublic}
                <Form.Group widths='equal'>
                    <Form.Field>
                        <Form.Input label='Recipe Name' name='recipeName' value={recipeName} placeholder={recipeData.recipeName} onChange={(e) => setRecipeName(e.target.value)} required />
                    </Form.Field>
                    <Form.Select fluid required label='Servings' options={servingsOptions} name="servings" value={servings} onChange={handleServings} placeholder={recipeData.servings} />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Field>
                        <Form.Input label="Prep Time" name="prepTime" value={prepTime} onChange={(e) => setPrepTime(e.target.value)} placeholder={recipeData.prepTime} />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input label="Cook Time" name="cookTime" value={cookTime} onChange={(e) => setCookTime(e.target.value)} placeholder={recipeData.cookTime} />
                    </Form.Field>
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Field>
                        <Form.TextArea label="Description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder={recipeData.description} required />
                    </Form.Field>
                </Form.Group>
                <Form.Group widths='equal'>
                    {showSteps}
                </Form.Group>
                <Form.Field>
                    <Button className="btn-outline" onClick={(e) => addSteps(e)}>Add steps</Button>
                </Form.Field>
                <RecipeAddIngredientsModal ingredients={ingredients} unitOptions={unitOptions} handleIngredientQuantityChange={handleIngredientQuantityChange} handleIngredientUnitChange={handleIngredientUnitChange} handleIngredientNameChange={handleIngredientNameChange} handleRemoveIngredient={handleRemoveIngredient} />
                <Form.Field>
                    <Button className="btn-outline" onClick={addNewIngredient}>Add a new ingredient</Button>
                </Form.Field>
                <RecipePics setImageUrl={setImageUrl} imageUrl={imageUrl} />
                <Form.Field>
                    <Button className="mauve-bg white-font" type='submit' onClick={(e) => handleSubmit(e)}>Add twist</Button>
                </Form.Field>
            </Form>
        </Container>
    )

}

export default AddTwist