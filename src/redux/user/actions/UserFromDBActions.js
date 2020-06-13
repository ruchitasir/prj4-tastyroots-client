import {
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILURE
  } from '../UserFromDBActionTypes'

import axios from 'axios'  


export const fetchUserRequest = () => {
    return {
      type: FETCH_USER_REQUEST
    }
}

export const fetchUserSuccess = user => {
    return {
      type: FETCH_USER_SUCCESS,
      payload: user
    }
}

export const fetchUserFailure = error => {
    return {
      type: FETCH_USER_FAILURE,
      payload: error
    }
}
  
export const fetchUser = () => {
    return (dispatch) => {
      dispatch(fetchUserRequest())
      let token = localStorage.getItem('boilerToken')
      axios
        .get(process.env.REACT_APP_SERVER_URL + 'profile', {
            headers: {
                'Authorization': `Bearer ${token}`
              }
        })
        .then(response => {
          // response.data is the user
          const user = response.data
          dispatch(fetchUserSuccess(user))
        })
        .catch(error => {
          // error.message is the error message
          dispatch(fetchUserFailure(error.message))
        })
    }
  }