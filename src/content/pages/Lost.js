import React from 'react';
import { Container, Image } from 'semantic-ui-react'

const Lost = props => {
    return (
        <Container fluid centered className="relative">
            <Image className="lost absolute" src="https://res.cloudinary.com/tasty-roots/image/upload/v1592185106/tasty-roots/278429483046211_vwe07z.webp"/>
            <span className="error">404</span>
            <div className="pg">
                <span>page not found.</span><br/>
                <span>the page you are looking for doesn't exist or is under construction.</span><br/>  
                <span>please head back home.</span>
            </div>
        </Container>
    )
}

export default Lost