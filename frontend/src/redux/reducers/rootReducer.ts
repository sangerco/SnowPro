import { combineReducers } from 'redux';
import userReducer from './userReducer';
import newUserReducer from './createUserReducer';
import loginReducer from './loginReducer';
import { messageReducer, newMessageReducer, deleteMessageReducer } from './messageReducer';

const rootReducer = combineReducers({
  user: userReducer,
  newUser: newUserReducer,
  login: loginReducer,
  message: messageReducer,
  newMessage: newMessageReducer,
  delete: deleteMessageReducer
});

export default rootReducer;