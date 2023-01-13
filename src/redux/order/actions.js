import * as types from "../types";
import axios from "axios";
import { actionTypes } from "redux-localstorage";

export const saveOrder = (order) => {
  return { type: types.SAVE_ORDER, payload: order };
};
export const createOrder = (order) => {
  console.log(order);
  return (dispatch) =>
    axios
      .post(`${import.meta.env.VITE_URL}/api/v1/orders`, order)
      .then((response) => {
        dispatch({
          type: types.CREATE_ORDER,
          payload: response.data,
        });
      })
      .catch((error) => console.log(error));
};
export const getAllOrder = () => {
  return (dispatch) =>
    axios.get(`${import.meta.env.VITE_URL}/api/v1/orders`).then((response) => {
      dispatch({
        type: types.GET_ORDER,
        payload: response.data[response.data.length - 1],
      });
    });
};

export const getOrdersIdfUser = (id_profile) => {
  return (dispatch) =>
    axios
      .get(`${import.meta.env.VITE_URL}/api/v1/orders/${id_profile}`)
      .then((response) => {
        dispatch({
          type: types.GET_ORDERS_ID_PROFILE,
          payload: response.data,
        });
      })
      .catch((error) => console.log(error));
};

export const getOrderById = (id_order) => {
  console.log(id_order);
  return (dispatch) =>
    axios
      .get(
        `${import.meta.env.VITE_URL}/api/v1/orders/orderbyid/filter/${id_order}`
      )
      .then((response) => {
        dispatch({
          type: types.GET_ORDER_BY_ID,
          payload: response.data,
        });
      })
      .catch((error) => console.log(error));
};
export const getOrders = () => {
  return (dispatch) =>
    axios.get(`http://localhost:3000/api/v1/orders`).then((response) => {
      dispatch({
        type: types.GET_ALL_ORDERS,
        payload: response.data,
      });
    });
};

export const getActiveOrders = () => {
  return (dispatch) =>
    axios
      .get(`${import.meta.env.VITE_URL}/api/v1/orders/active`)
      .then((response) => {
        dispatch({
          type: types.GET_ACTIVE_ORDERS,
          payload: response.data,
        });
      });
};

export const changeStateOrder = (id, cancel) => {
  console.log(id);
  return (dispatch) =>
    axios
      .put(
        `${
          import.meta.env.VITE_URL
        }/api/v1/orders/change/${id}?cancel=${cancel}`
      )
      .then((response) => {
        console.log(response.data);
        dispatch({
          type: types.CHANGE_STATE_ORDER,
        });
      })
      .catch((error) => console.log(error));
};

export const changeStateOrderFalse = () => {
  return { type: types.CHANGE_STATE_ORDER_FALSE };
};

export const deleteOrderActive = () => {
  return {
    type: types.DELETE_ACTIVE,
  };
};
