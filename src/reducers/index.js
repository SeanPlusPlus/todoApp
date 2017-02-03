import { combineReducers } from 'redux';
import { postsByUser, selectedUser } from './todos';
import navLinks from './nav';

const rootReducer = combineReducers({
  postsByUser,
  selectedUser,
  navLinks,
});

export default rootReducer;
