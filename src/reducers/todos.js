import {
  SELECT_USER, INVALIDATE_USER,
  REQUEST_POSTS, RECEIVE_POSTS,
} from '../actions/todos';

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

export function selectedUser(state = 'hansolo', action) {
  switch (action.type) {
    case SELECT_USER:
      return action.user;
    default:
      return state;
  }
}

export function postsByUser(state = { }, action) {
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
