import React, { useState} from 'react';
import { Button } from 'semantic-ui-react'


const TopButton = props => {
    let [showScroll, setShowScroll] = useState(false)

    let checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 400) {
            setShowScroll(true)
        } else if (showScroll && window.pageYOffset <= 400) {
            setShowScroll(false)
        }
    }

    let scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    window.addEventListener('scroll', checkScrollTop)

    return (
        <Button icon='angle up' className="mauve-bg white-font scrollTop" onClick={scrollTop} style={{ height: 40, display: showScroll ? 'flex' : 'none' }} />
    )
}

export default TopButton