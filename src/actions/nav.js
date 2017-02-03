import fetch from 'isomorphic-fetch';

export const REQUEST_NAV = 'REQUEST_NAV';
export const RECEIVE_NAV = 'RECEIVE_NAV';

function receiveNav(json) {
  return {
    type: RECEIVE_NAV,
    links: json.data.children.map(child => child.data),
  };
}

function requestNav() {
  return {
    type: REQUEST_NAV,
  };
}

function fetchNav() {
  return (dispatch) => {
    dispatch(requestNav());
    const url = 'http://localhost:8000/nav.json';
    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(receiveNav(json)));
  };
}

export function fetchNavIfNeeded() {
  return (dispatch) => {
    return dispatch(fetchNav());
  };
}
