// Packages
import React from 'react'
import { Route, Switch } from 'react-router-dom'

// Custom component
import Home from './pages/Home'
import FamilyCircle from './pages/FamilyCircle'
import EditProfile from './pages/EditProfile'
import Lost from './pages/Lost'
import Profile from './pages/Profile'
import Recipe from './pages/Recipe'
import RecipeDetails from './pages/RecipeDetails'


const Content = props => {
  return (
    <Switch>
      <Route exact path="/" render={
        () => <Home user={props.user} updateToken={props.updateToken}/>
      } />
      <Route path="/profile/edit" render={
        () => <EditProfile user={props.user} />
      } />
      <Route path="/profile" render={
        () => <Profile user={props.user} />
      } />
      <Route path="/recipes" render={
        () => <Recipe user={props.user} />
      } />
      <Route path="/familycircle" render={
        () => <FamilyCircle user={props.user} />
      } />
      <Route path="/recipe/:id" render={
          () => <RecipeDetails user={props.user} />
        }></Route>
      <Route component={Lost} />
    </Switch>
  )
}

export default Content
