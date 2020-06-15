import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchUser } from '../../redux/user/actions/UserFromDBActions'

import { Item } from 'semantic-ui-react';

const UserFromDB= ({ userData, fetchUser})=> {
    useEffect(() => {
        fetchUser()
      }, [])
    
    let renderUser = <div>  </div>
    
    if(userData && userData.user )  {
        renderUser =  <Item.Group>
                         <Item>
                            {userData.user.picture ? <Item.Image size='small' src={userData.user.picture} circular /> : <Item.Image size='small' src="https://res.cloudinary.com/tasty-roots/image/upload/v1592180109/tasty-roots/w3ptru2tsjlosw7rfyi9.jpg" circular />}
                            <Item.Content verticalAlign="middle">
                                <h1>{userData.user.firstname} {userData.user.lastname}</h1>
                                <Item.Meta>
                                    <span className='email'>{userData.user.email}</span>
                                </Item.Meta>
                                <Item.Description>{userData.user.bio ? userData.user.bio : "A little bit about me ..."}</Item.Description>
                            </Item.Content>
                        </Item>
                     </Item.Group>
    }

   return(
         renderUser
         )
}

const mapStateToProps = state => {
    return {
      userData: state.userDB
    }
  }

const mapDispatchToProps = dispatch => {
    return {
      fetchUser: () => dispatch(fetchUser())
    }
  }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserFromDB)