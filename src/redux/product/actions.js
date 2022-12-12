import * as types from "../types";
import axios from "axios";

export const getProducts = () => {
  return (dispatch) =>
    axios
      .get(`http://localhost:3000/api/v1/products`)
      .then((response) => {
        dispatch({
          type: types.GET_PRODUCTS,
          payload: response.data,
        });
      })
      .catch((error) => console.log(error));
};

export const sortByTimePreparation = (order) => {
  console.log("action", order);
  return {
    type: types.SORT_BY_TIME_PREPARATION,
    payload: order,
  };
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

export const filterByCategory = (category) => {
  console.log(category);
  return (dispatch) =>
    axios
      .get(
        `http://localhost:3000/api/v1/products/filter/filterByCategory?category=${category}`
      )
      .then((response) => {
        console.log(response.data);
        dispatch({
          type: types.FILTER_BY_CATEGORY,
          payload: response.data,
        });
      })
      .catch((error) => console.log(error));
};

export const sortProductsByPrice = (price) => {
  console.log("action", price);
  return {
    type: types.SORT_PRODUCTS_BY_PRICE,
    payload: price,
  };
};

export const getProductById = (id) => {
  return (dispatch) =>
    axios
      .get(`http://localhost:3000/api/v1/products/${id}`)
      .then((response) => {
        console.log(response.data);
        dispatch({
          type: types.GET_PRODUCT_BY_ID,
          payload: response.data,
        });
      })
      .catch((error) => console.log(error));
};

export const clearProduct = () => {
  return {
    type: types.CLEAR_PRODUCTS,
  };
};
