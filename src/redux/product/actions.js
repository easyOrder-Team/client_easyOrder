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

export const sortByTimePreparation = (time, category) => {
  return (dispatch) =>
    axios
      .get(`http://localhost:3000/api/v1/products/filter/timePreparationOrder`)
      .then((response) => {
        dispatch({
          type: types.SORT_BY_TIME_PREPARATION,
          payload: { response: response.data, time, category },
        });
      });
};

export const getProductByName = (name) => {
  return (dispatch) =>
    axios
      .get(`http://localhost:3000/api/v1/products?name=${name}`)
      .then((response) => {
        dispatch({
          type: types.GET_PRODUCTS_BY_NAME,
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

export const sortProductsByPrice = (price, category) => {
  return (dispatch) =>
    axios
      .get(`http://localhost:3000/api/v1/products/filter/priceOrder`)
      .then((response) => {
        dispatch({
          type: types.SORT_PRODUCTS_BY_PRICE,
          payload: { response: response.data, price, category },
        });
      })
      .catch((error) => console.log(error));
};

export const getProductById = (id) => {
  return (dispatch) =>
    axios
      .get(`http://localhost:3000/api/v1/products/${id}`)
      .then((response) => {
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

export const addProductCart = (product) => {
  return {
    type: types.ADD_PRODUCT_CART,
    payload: product,
  };
};

export const clearCart = () => {
  return {
    type: types.CLEAR_CART,
  };
};
export const deleteProduct = (id) => {
  return (dispatch) => {
    axios
      .delete(`http://localhost:3000/api/v1/products/${id}`)
      .then((response) => {
        return {
          type: types.DELETE_PRODUCT,
          payload: id,
        };
      })
      .catch((error) => console.log(error));
  };
};
