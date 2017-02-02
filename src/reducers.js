import { combineReducers } from 'redux';
import {
  SELECT_USER, INVALIDATE_USER,
  REQUEST_POSTS, RECEIVE_POSTS,
  REQUEST_NAV, RECEIVE_NAV,
} from './actions';

function selectedUser(state = 'hansolo', action) {
  switch (action.type) {
    case SELECT_USER:
      return action.user;
    default:
      return state;
  }
}

function posts(state = {
  isFetching: false,
  didInvalidate: false,
  items: [],
}, action) {
  switch (action.type) {
    case INVALIDATE_USER:
      return Object.assign({}, state, {
        didInvalidate: true,
      });
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
      });
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt,
      });
    default:
      return state;
  }
}

function postsByUser(state = { }, action) {
  switch (action.type) {
    case INVALIDATE_USER:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.user]: posts(state[action.user], action),
      });
    default:
      return state;
  }
}

function links(state = {
  isFetchingNav: false,
  items: [],
}, action) {
  switch (action.type) {
    case REQUEST_NAV:
      return Object.assign({}, state, {
        isFetchingNav: true,
      });
    case RECEIVE_NAV:
      return Object.assign({}, state, {
        isFetchingNav: false,
        items: action.links,
        lastUpdated: action.receivedAt,
      });
    default:
      return state;
  }
}

function navLinks(state = { }, action) {
  switch (action.type) {
    case RECEIVE_NAV:
    case REQUEST_NAV:
      return Object.assign({}, state, {
        data: links(state[action], action),
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  postsByUser,
  selectedUser,
  navLinks,
});

export default rootReducer;
