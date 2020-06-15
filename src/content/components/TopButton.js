import React from 'react';
import {Button} from 'semantic-ui-react'

const TopButton = props => {
    let scrollUp = () => {

    }
    return (
        <><Button circular icon='angle up' className="mauve-bg white-font top-btn" onClick={scrollUp} /></>
    )
}

export default TopButton