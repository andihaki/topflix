import {
  FETCH_MOVIES_BEGIN,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE
} from "./actionTypes";

import { API } from "../constants";

// export const fetchMovies = movies => ({
//   type: FETCH_MOVIES,
//   payload: {
//     movies
//   }
// });

export const fetchMoviesBegin = () => ({
  type: FETCH_MOVIES_BEGIN
});

export const fetchMoviesSuccess = movies => ({
  type: FETCH_MOVIES_SUCCESS,
  payload: { movies }
});

export const fetchMoviesFailure = error => ({
  type: FETCH_MOVIES_FAILURE,
  payload: { error }
});

export const fetchMovies = () => {
  console.log("fetch movies");
  return dispatch => {
    dispatch(fetchMoviesBegin());
    return fetch(API)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then(data => {
        dispatch(fetchMoviesSuccess(data.results));
        return data.results;
      })
      .catch(error => dispatch(fetchMoviesFailure(error)));
  };
};
