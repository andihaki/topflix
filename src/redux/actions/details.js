import {
  FETCH_CAST_BEGIN,
  FETCH_CAST_SUCCESS,
  FETCH_CAST_FAILURE,
  FETCH_SIMILAR_BEGIN,
  FETCH_SIMILAR_SUCCESS,
  FETCH_SIMILAR_FAILURE,
  FETCH_RECOMMENDATION_BEGIN,
  FETCH_RECOMMENDATION_SUCCESS,
  FETCH_RECOMMENDATION_FAILURE,
  FETCH_REVIEWS_BEGIN,
  FETCH_REVIEWS_SUCCESS,
  FETCH_REVIEWS_FAILURE,
  FETCH_DETAILS_BEGIN,
  FETCH_DETAILS_SUCCESS,
  FETCH_DETAILS_FAILURE
} from "./actionTypes";

import {
  API_CAST,
  API_SIMILAR,
  API_RECOMMENDATION,
  API_REVIEWS,
  API_DETAILS
} from "../constants";

// movie CAST
export const fetchCastBegin = () => ({
  type: FETCH_CAST_BEGIN
});

export const fetchCastSuccess = casts => ({
  type: FETCH_CAST_SUCCESS,
  payload: { casts }
});

export const fetchCastFailure = error => ({
  type: FETCH_CAST_FAILURE,
  payload: { error }
});

// movie SIMILAR
export const fetchSimilarBegin = () => ({
  type: FETCH_SIMILAR_BEGIN
});

export const fetchSimilarSuccess = similars => ({
  type: FETCH_SIMILAR_SUCCESS,
  payload: { similars }
});

export const fetchSimilarFailure = error => ({
  type: FETCH_SIMILAR_FAILURE,
  payload: { error }
});

// movie RECOMMENDATION
export const fetchRecommendationBegin = () => ({
  type: FETCH_RECOMMENDATION_BEGIN
});

export const fetchRecommendationSuccess = recommendations => ({
  type: FETCH_RECOMMENDATION_SUCCESS,
  payload: { recommendations }
});

export const fetchRecommendationFailure = error => ({
  type: FETCH_RECOMMENDATION_FAILURE,
  payload: { error }
});

// movie REVIEWS
export const fetchReviewsBegin = () => ({
  type: FETCH_REVIEWS_BEGIN
});

export const fetchReviewsSuccess = reviews => ({
  type: FETCH_REVIEWS_SUCCESS,
  payload: { reviews }
});

export const fetchReviewsFailure = error => ({
  type: FETCH_REVIEWS_FAILURE,
  payload: { error }
});

// movie DETAILS
export const fetchDetailsBegin = () => ({
  type: FETCH_DETAILS_BEGIN
});

export const fetchDetailsSuccess = details => ({
  type: FETCH_DETAILS_SUCCESS,
  payload: { details }
});

export const fetchDetailsFailure = error => ({
  type: FETCH_DETAILS_FAILURE,
  payload: { error }
});

export const buyMovie = movieId => ({
  type: BUY_MOVIE,
  payload: { movieId }
});

// async
export const fetchCast = movieId => {
  return dispatch => {
    dispatch(fetchCastBegin());

    return fetch(API_CAST.replace("movie_id", movieId))
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then(data => {
        dispatch(fetchCastSuccess(data.cast));

        return data.cast;
      })
      .catch(error => dispatch(fetchCastFailure(error)));
  };
};
export const fetchSimilar = movieId => {
  return dispatch => {
    dispatch(fetchSimilarBegin());

    return fetch(API_SIMILAR.replace("movie_id", movieId))
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then(data => {
        dispatch(fetchSimilarSuccess(data.results));

        return data.results;
      })
      .catch(error => dispatch(fetchSimilarFailure(error)));
  };
};
export const fetchRecommendation = movieId => {
  return dispatch => {
    dispatch(fetchRecommendationBegin());

    return fetch(API_RECOMMENDATION.replace("movie_id", movieId))
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then(data => {
        dispatch(fetchRecommendationSuccess(data.results));

        return data.results;
      })
      .catch(error => dispatch(fetchRecommendationFailure(error)));
  };
};
export const fetchReviews = movieId => {
  return dispatch => {
    dispatch(fetchReviewsBegin());

    return fetch(API_REVIEWS.replace("movie_id", movieId))
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then(data => {
        dispatch(fetchReviewsSuccess(data.results));

        return data.results;
      })
      .catch(error => dispatch(fetchReviewsFailure(error)));
  };
};
export const fetchDetails = movieId => {
  return dispatch => {
    dispatch(fetchDetailsBegin());

    dispatch(fetchCast(movieId));
    dispatch(fetchRecommendation(movieId));
    dispatch(fetchSimilar(movieId));
    dispatch(fetchReviews(movieId));

    return fetch(API_DETAILS.replace("movie_id", movieId))
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then(data => {
        dispatch(fetchDetailsSuccess(data));

        return data;
      })
      .catch(error => dispatch(fetchDetailsFailure(error)));
  };
};
