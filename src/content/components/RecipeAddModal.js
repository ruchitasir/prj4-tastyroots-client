import React,{useState } from 'react';
import { Button, Form, Header, Icon, Input, Modal } from 'semantic-ui-react'
import RecipeAddStepsInModal from '../components/RecipeAddStepsInModal'

const RecipeAddModal= props=> {

    let [steps, setSteps] = useState([])
    let [step,setStep]= useState()

    const servingsOptions =[
        {  text: '0.5', value: 0.5 },
        {  text: '1', value: 1 },
        {  text: '1.5', value: 1.5 },
        {  text: '2', value: 2 },
        {  text: '2.5', value: 2.5 },
        {  text: '3', value: 3 },
        {  text: '3.5', value: 3.5 },
        {  text: '4', value: 4 },
        {  text: '4.5', value: 4.5 },
        {  text: '5', value: 5 },
        {  text: '5.5', value: 5.5 },
        {  text: '6', value: 6 }
    ]
   

    const addNewIngredient = ()=>{
        console.log('clicked for add new ingredient')
       
    }

    const handleStepChange=(e,index)=>{
        steps[index] = e.target.value
        setStep(steps[index])
        setSteps(steps)
       
    }

    const addSteps =(e)=>{
       setSteps([...steps,''])
    }

    const handleRemoveSteps=(index)=>{

        console.log('steps',steps)
        console.log('index to be removed',index)
        console.log('step at index',steps[index])
        let newSteps = [...steps]
        console.log('newsteps',newSteps)
        newSteps.splice(index,1)
        console.log('newsteps after removal',newSteps)
        setSteps(newSteps)
    }

    return (

    <Modal trigger={<Icon name='edit' size='large'></Icon>} size={"small"} as={Form}  closeIcon>  
    <Header icon='user circle' content='Add new recipe' />
            <Modal.Content>
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <Form.Input label="Recipe Name" name="recipeName" required />
                            </Form.Field>
                            <Form.Field>
                                <Form.Input label="Description" name="description"   required />
                            </Form.Field>
                            <Form.Select fluid required label='Servings'  options={servingsOptions}  name="servings"  placeholder="Servings"/>
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <Form.Input label="Prep Time" name="prepTime"   required />
                            </Form.Field>
                            <Form.Field>
                                <Form.Input label="Cook Time" name="cookTime"   required />
                            </Form.Field>
                          
                            <Form.Field>
                                <Form.Input label="Ingredient Name" name="name"   required />
                            </Form.Field>
                            <Button onClick={addNewIngredient}>Add a new ingredient</Button>
                            <Form.Field>
                                <input type="hidden"  name="id" />
                            </Form.Field>
                        </Form.Group>
                        <RecipeAddStepsInModal steps={steps}  handleRemoveSteps={handleRemoveSteps} handleStepChange={handleStepChange}/>
                        <Form.Group>
                                <Button onClick={(e)=>addSteps(e)}>Add steps</Button>
                        </Form.Group>
                        
                </Modal.Content>
            <Modal.Actions>
                <Button color='green' type="submit">Add Recipe</Button>
            </Modal.Actions>
        </Modal>
          )
    }

export default RecipeAddModal