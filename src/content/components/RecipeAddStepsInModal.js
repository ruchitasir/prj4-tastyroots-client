import React from 'react';
import { Button, Form } from 'semantic-ui-react'

const RecipeAddStepsInModal= props=> {
 return ( 
            props.steps.map((step,ind)=>{
                console.log('ind',ind)
                return (
                
                        <Form.Group widths='equal'>
                            <Form.Field className='index'>
                                <Form.Input label="Step" name="step"  value={step} onChange={(e)=>props.handleStepChange(e,ind)}  required />
                            </Form.Field>
                        
                            <Button onClick={()=> props.handleRemoveSteps(ind)}>Remove</Button>
                        </Form.Group>
                        )
            })
        )    
}

export default RecipeAddStepsInModal