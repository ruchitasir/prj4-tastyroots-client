import { combineReducers } from 'redux'
import userFromDBReducer from '../redux/user/reducer/UserFromDBReducer'

const rootReducer = combineReducers({
  
    userDB: userFromDBReducer
  })
  
  export default rootReducer