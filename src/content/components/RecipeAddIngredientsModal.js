import React from 'react';
import { Form } from 'semantic-ui-react'

const RecipeAddIngredientsModal = props => {
    return (
        props.ingredients.map((ing, ind) => {
            console.log('ind', ind)
            return (
                <div>
                    <Form.Group columns='equal'>
                        <Form.Field >
                            <Form.Input label="Quantity" name="qty" value={ing.qty} onChange={(e) => props.handleIngredientQuantityChange(e, ind)} required />
                        </Form.Field>
                        <Form.Select fluid required label='Unit' name="unit" options={props.unitOptions} onChange={(e, data) => props.handleIngredientUnitChange(e, data, ind)} placeholder="Select" />
                        <Form.Field >
                            <Form.Input label="Ingredient" name="name" value={ing.name} onChange={(e) => props.handleIngredientNameChange(e, ind)} required />
                        </Form.Field>
                        <Form.Field>
                            <Form.Button onClick={() => props.handleRemoveIngredient(ind)} className="remove-btn">Remove</Form.Button>
                        </Form.Field>
                    </Form.Group>
                </div>

            )
        })
    )
}

export default RecipeAddIngredientsModal