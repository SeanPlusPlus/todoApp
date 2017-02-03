import fetch from 'isomorphic-fetch';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SELECT_USER = 'SELECT_USER';
export const INVALIDATE_USER = 'INVALIDATE_USER';
export const REQUEST_NAV = 'REQUEST_NAV';
export const RECEIVE_NAV = 'RECEIVE_NAV';

export function selectUser(user) {
  return {
    type: SELECT_USER,
    user,
  };
}

export function invalidateUser(user) {
  return {
    type: INVALIDATE_USER,
    user,
  };
}

function requestPosts(user) {
  return {
    type: REQUEST_POSTS,
    user,
  };
}

function receivePosts(user, json) {
  return {
    type: RECEIVE_POSTS,
    user,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now(),
  };
}

function fetchPosts(user) {
  return (dispatch) => {
    dispatch(requestPosts(user));
    const url = `http://localhost:8000/${user}.json`;
    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(user, json)));
  };
}

function shouldFetchPosts(state, user) {
  const posts = state.postsByUser[user];
  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  }
  return posts.didInvalidate;
}

export function fetchPostsIfNeeded(user) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), user)) {
      return dispatch(fetchPosts(user));
    }
  };
}
