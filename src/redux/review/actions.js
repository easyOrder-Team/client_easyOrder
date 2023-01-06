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