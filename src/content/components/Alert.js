import React, {useState} from 'react';
import { Message } from 'semantic-ui-react'


const Alert = props => {
    let [visible, setVisible] = useState(false)

    const handleDismiss = () => {
        //dismiss message state
        setVisible(false)

    }

    if (props.message) {
        setVisible(true)
        return (
            <Message compact negative visible={visible} onDismiss={handleDismiss}>
                {props.message}
            </Message>
        )
    }
    return null
    
}

export default Alert