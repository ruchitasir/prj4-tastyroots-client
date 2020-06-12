import React from 'react';
import { Button, Form } from 'semantic-ui-react'

const RecipeAddIngredientsModal= props=> {
   return(
            props.ingredients.map((ing,ind)=>{
                console.log('ind',ind)
                return (
                        <div> 
                            <Form.Group widths='equal'>
                                <Form.Field >
                                    <Form.Input label="Quantity" name="qty" value={ing.qty}  onChange={(e)=>props.handleIngredientQuantityChange(e,ind)}  required />
                                </Form.Field>
                            
                                <Form.Select fluid required label='Unit' name="unit"  options={props.unitOptions}   onChange={(e,data)=>props.handleIngredientUnitChange(e,data,ind)}  placeholder="Select measurement Unit"/>
                                </Form.Group>  
                            <Form.Group widths='equal'>
                                <Form.Field >
                                    <Form.Input label="Ingredient" name="name" value={ing.name}  onChange={(e)=>props.handleIngredientNameChange(e,ind)}  required />
                                </Form.Field>
                                <Button onClick={()=> props.handleRemoveIngredient(ind)}>Remove</Button>
                            </Form.Group>
                        </div>
                
                )
            })
         )
    }

export default RecipeAddIngredientsModal