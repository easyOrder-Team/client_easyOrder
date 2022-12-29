import * as types from "../types";
import axios from "axios";


export const saveOrder = (order) => {
  return {type: types.SAVE_ORDER, payload: order}
}
export const createOrder = (order) => {
    console.log(order)
    return (dispatch) =>
      axios
        .post(`http://localhost:3000/api/v1/orders`,order)
        .then((response) => {
          dispatch({
            type: types.CREATE_ORDER,
            payload: response.data,
          });
        })
        .catch((error) => console.log(error));
  };
export const getAllOrder =  () => {
  return (dispatch) => 
  axios.get(`http://localhost:3000/api/v1/orders`)
  .then((response) => {
    dispatch({
      type: types.GET_ORDER,
      payload: response.data[response.data.length-1]
    }) 
  })
}

  export const getOrdersIdfUser = (id_profile) => {
    return (dispatch) =>
      axios
        .get(`http://localhost:3000/api/v1/orders/${id_profile}`)
        .then((response) => {
          dispatch({
            type: types.GET_ORDERS_ID_PROFILE,
            payload: response.data,
          });
        })
        .catch((error) => console.log(error));
  };