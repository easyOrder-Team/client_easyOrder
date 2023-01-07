import * as types from "../types";
import axios from "axios";


export const createReview = (review) => {
    return (dispatch) =>
      axios
        .post(`http://localhost:3000/api/v1/review`, review)
        .then((response) => {
        console.log('action')
          console.log(response)
        })
        .catch((error) => console.log(error));
  };

  export const getReviewByIdProfile = (id) => {
    return (dispatch) =>
      axios
        .get(`http://localhost:3000/api/v1/review/profile/${id}`)
        .then((response) => {
          console.log(response.data)
          dispatch({
            type: types.GET_REVIEW_BY_ID_PROFILE,
            payload: response.data,
          });
        })
        .catch((error) => console.log(error));
  };
 
  export const getReviewByIdReview = (id) => {
    return (dispatch) =>
      axios
        .get(`http://localhost:3000/api/v1/review/review/${id}`)
        .then((response) => {
          console.log(response.data)
          dispatch({
            type: types.GET_REVIEW_BY_ID_REVIEW,
            payload: response.data,
          });
        })
        .catch((error) => console.log(error));
  };