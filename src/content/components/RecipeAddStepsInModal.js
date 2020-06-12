import React from 'react';
import { Button, Form } from 'semantic-ui-react'

const RecipeAddStepsInModal = props => {
    return (
        props.steps.map((step, ind) => {

            return (
                <Form.Group>
                    <Form.Field>
                        <Form.Input widths={12}label="Step" name="step" value={step} onChange={(e) => props.handleStepChange(e, ind)} required />
                    </Form.Field>
                    <Form.Field>
                        <Form.Button widths={4}onClick={() => props.handleRemoveSteps(ind)} className="remove-btn">Remove</Form.Button>
                    </Form.Field>
                </Form.Group>
            )
        })
    )
}

export default RecipeAddStepsInModal