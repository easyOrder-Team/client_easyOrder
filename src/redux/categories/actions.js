import * as types from "../types";
import axios from "axios";

export const getCategories = () => {
  return (dispatch) =>
    axios
      .get(`http://localhost:3000/api/v1/products/categories`)
      .then((response) => {
        dispatch({
          type: types.GET_CATEGORIES,
          payload: response.data,
        });
      })
      .catch((error) => console.log(error));
};

export const filterByCategory = (category) => {
  return (dispatch) =>
    axios
      .get(
        `http://localhost:3000/api/v1/products/filter/filterByCategory?category=${category}`
      )
      .then((response) => {
        dispatch({
          type: types.FILTER_BY_CATEGORY,
          payload: response.data,
        });
      })
      .catch((error) => console.log(error));
};
