import React from 'react';
import { Form } from 'semantic-ui-react'

const RecipeAddStepsInModal = props => {
    return (
        props.steps.map((step, ind) => {

            return (
                <Form.Group>
                        <Form.Input fluid width={16} label="Step" name="step" value={step} onChange={(e) => props.handleStepChange(e, ind)} required />
                        <Form.Button onClick={() => props.handleRemoveSteps(ind)} className="remove-btn">Remove</Form.Button>
                </Form.Group>
            )
        })
    )
}

export default RecipeAddStepsInModal