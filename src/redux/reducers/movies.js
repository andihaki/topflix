import {
  FETCH_MOVIES_BEGIN,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
  CHANGE_PAGE,
  FETCH_CAST_BEGIN,
  FETCH_CAST_SUCCESS,
  FETCH_CAST_FAILURE,
  FETCH_SIMILAR_BEGIN,
  FETCH_SIMILAR_SUCCESS,
  FETCH_SIMILAR_FAILURE,
  FETCH_RECOMMENDATION_BEGIN,
  FETCH_RECOMMENDATION_FAILURE,
  FETCH_RECOMMENDATION_SUCCESS,
  FETCH_REVIEWS_BEGIN,
  FETCH_REVIEWS_FAILURE,
  FETCH_REVIEWS_SUCCESS
} from "../actionTypes";

// import dummy from "./dummy";

const initialState = {
  movies: [],
  loading: false,
  error: null,
  pages: [],
  currentPage: 0,
  limitPage: 2,
  movieId: "",
  casts: [],
  similars: [],
  recommendations: [],
  reviews: [],
  saldo: 100000
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_MOVIES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_MOVIES_SUCCESS:
      const pages = Array(
        Math.ceil(action.payload.movies.length / state.limitPage)
      )
        .fill()
        .map((_, i) => i + 1);
      const movies = action.payload.movies.map((movie, index) => {
        const slug = `${movie.id}-${movie.title
          .replace(/\s+/g, "-")
          .toLowerCase()}`;
        return {
          ...movie,
          slug,
          index,
          price: 3500
        };
      });
      console.log(movies);
      return {
        ...state,
        loading: false,
        movies,
        pages,
        currentPage: 1
      };
    case FETCH_MOVIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        movies: []
      };
    case CHANGE_PAGE:
      // console.log("change page: " + action.payload.activePage);
      return {
        ...state,
        currentPage: action.payload.activePage,
        movieId: ""
      };
    case FETCH_CAST_BEGIN:
      return { ...state, casts: [] };
    case FETCH_CAST_SUCCESS:
      return {
        ...state,
        casts: action.payload.casts
      };
    case FETCH_CAST_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        casts: []
      };
    case FETCH_SIMILAR_BEGIN:
      return { ...state, similars: [] };
    case FETCH_SIMILAR_SUCCESS:
      const similars = action.payload.similars.length
        ? action.payload.similars
        : [{ id: 0, title: "tidak ada informasi film terkait" }];
      return {
        ...state,
        similars
      };
    case FETCH_SIMILAR_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        similars: []
      };
    case FETCH_RECOMMENDATION_BEGIN:
      return { ...state, recommendations: [] };
    case FETCH_RECOMMENDATION_SUCCESS:
      console.log("FETCH_RECOMMENDATION", action.payload.recommendations);
      const recommendations = action.payload.recommendations.length
        ? action.payload.recommendations
        : [{ id: 0, title: "tidak ada informasi film terkait" }];
      return {
        ...state,
        recommendations
      };
    case FETCH_RECOMMENDATION_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        recommendations: []
      };
    case FETCH_REVIEWS_BEGIN:
      return { ...state, reviews: [] };
    case FETCH_REVIEWS_SUCCESS:
      console.log("FETCH_REVIEWS", action.payload.reviews);
      console.log(action.payload.reviews);
      const reviews = action.payload.reviews.length
        ? action.payload.reviews
        : [{ id: 0, title: "tidak ada review" }];
      return {
        ...state,
        reviews
      };
    case FETCH_REVIEWS_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        reviews: []
      };
    default:
      return state;
  }
}
