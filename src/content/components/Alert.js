import React from 'react';
import { Message } from 'semantic-ui-react'

const Alert = props => {
    if (props.message) {
        return (
            <Message compact negative>
                {props.message}
            </Message>
        )
    }
    return null
    
}

export default Alert