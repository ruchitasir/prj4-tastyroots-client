import React from 'react'
import Signup from './Signup'
import { Container, Grid, Header, Image } from 'semantic-ui-react'

const Home = props => {
  if (props.user) {
    return (
      <Container className="top-spacing-2" id="home" as={Grid} stackable columns={4}>
        {/* <Grid stackable columns={4}> */}
        <Grid.Row className="top-spacing-2">
          <Grid.Column>
            <Image className="square" src="https://res.cloudinary.com/tasty-roots/image/upload/v1592194329/tasty-roots/dvrf1i4qnsl2mvbs0ylq.jpg" alt="sushi" />
          </Grid.Column>
          <Grid.Column>
            <Image className="square" src="https://res.cloudinary.com/tasty-roots/image/upload/v1592190985/tasty-roots/ihaptgaes5rtfve3vy3h.jpg" alt="fritatta" />
          </Grid.Column>
          <Grid.Column>
            <Image className="square" src="https://res.cloudinary.com/tasty-roots/image/upload/v1592190918/tasty-roots/t0zwxg6bomg807dyhzqc.jpg" alt="ramen" />
          </Grid.Column>
          <Grid.Column>
            <Image className="square" src="https://res.cloudinary.com/tasty-roots/image/upload/v1592191196/tasty-roots/d541fyn0p7wzjwmer4d5.jpg" alt="pizza" />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            <Image id="logo" src="https://res.cloudinary.com/tasty-roots/image/upload/v1592190475/tasty-roots/Beet_v1_xgmdwg.png" alt="logo" />
          </Grid.Column>

          <Grid.Column width={12}>
            <p className="about">Food brings people together. Family recipes can provoke feelings of nostalgia of one's childhood and connection with past generations. Learning to cook one's favorite family recipes spreads awareness of your roots and appreciation of one's culture. We hope you can use this platform  as a tasty way to keep your recipes and roots alive! </p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
        <Grid.Column>
            <Image className="square" src="https://res.cloudinary.com/tasty-roots/image/upload/v1592190801/tasty-roots/bdx9lfvglqedjwju2fyr.jpg" alt="thali" />
          </Grid.Column>
          <Grid.Column>
            <Image className="square" src="https://res.cloudinary.com/tasty-roots/image/upload/v1592161929/tasty-roots/drjgcu4xvqs57yxkmaxy.jpg" alt="fried rice" />
          </Grid.Column>
        <Grid.Column>
            <Image className="square" src="https://res.cloudinary.com/tasty-roots/image/upload/v1592161406/tasty-roots/zqlmrmadu0fa2edexuwq.png" alt="nacho" />
          </Grid.Column>
          
          <Grid.Column className="square">
            <Image className="square" src="https://res.cloudinary.com/tasty-roots/image/upload/v1592162536/tasty-roots/cijg4nzovudo1tgomooi.jpg" alt="lumpia" />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column className="square"></Grid.Column>
        </Grid.Row>
        {/* </Grid> */}
      </Container>
    )
  }
  return (
    <Container className="top-spacing">
      <Signup user={props.user} updateToken={props.updateToken} />
    </Container>
  )
}

export default Home
