import * as types from "../types";
import axios from "axios";

export const getProducts = () => {
  return (dispatch) =>
    axios
      .get("http://localhost:3000/api/v1/products")
      .then((response) => {
        dispatch({
          type: types.GET_PRODUCTS,
          payload: response.data,
        });
      })
      .catch((error) => console.log(error));
};

export const getProductById = (id) => {
  return (dispatch) =>
    axios
      .get(`http://localhost:3000/api/v1/product/${id}`)
      .then((response) => {
        dispatch({
          type: types.GET_PRODUCT_BY_ID,
          payload: response.data,
        });
      })
      .catch((error) => console.log(error));
};

export const postProducts = (data) => {
  return axios
    .post(`http://localhost:3000/api/v1/products`, data)
    .then((response) => response)
    .catch((error) => console.log(error));
};

export const getProductByName = (name) => {
  console.log(name);
  return (dispatch) =>
    axios
      .get(`http://localhost:3000/api/v1/products?name=${name}`)
      .then((response) => {
        console.log(response.data);
        dispatch({
          type: types.GET_PRODUCTS_BY_NAME,
          payload: response.data,
        });
      })
      .catch((error) => console.log(error));
};
