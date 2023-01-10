import * as types from "../types";
import axios from "axios";

export const getCategories = () => {
  return (dispatch) =>
    axios
      .get(`${import.meta.env.VITE_URL}/api/v1/products/categories`)
      .then((response) => {
        dispatch({
          type: types.GET_CATEGORIES,
          payload: response.data,
        });
      })
      .catch((error) => console.log(error));
};
