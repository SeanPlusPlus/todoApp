import { REQUEST_NAV, RECEIVE_NAV } from '../actions/nav';

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

export default navLinks;
