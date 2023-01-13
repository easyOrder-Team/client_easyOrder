import * as types from "../types";
import axios from "axios";


export const saveOrder = (order) => {
  return {type: types.SAVE_ORDER, payload: order}
}
export const createOrder = (order) => {
    console.log(order)
    return (dispatch) =>
      axios
        .post(`${import.meta.env.VITE_URL}/api/v1/orders`,order)
        .then((response) => {
          console.log('response de la orden')
          localStorage.setItem('vas', 2)
          let idO = response.data.id_orders
          localStorage.setItem('idOrder', idO)
          console.log(idO)
         
          dispatch({
            type: types.CREATE_ORDER,
            payload: response.data,
          });
        })
        .catch((error) => console.log(error));
  };
export const getAllOrder =  () => {
  return (dispatch) => 
  axios.get(`${import.meta.env.VITE_URL}/api/v1/orders`)
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
    return (dispatch) =>
      axios
        .get(`${import.meta.env.VITE_URL}/api/v1/orders/orderbyid/filter/${id_order}`)
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
  axios.get(`http://localhost:3000/api/v1/orders`)
  .then((response) => {
    dispatch({
      type: types.GET_ALL_ORDERS,
      payload: response.data
    }) 
  })
  }

  export const updateOrder = (id, order) => {
    console.log(id);
    return () =>
      axios
        .put(`http://localhost:3000/api/v1/orders/update/${id}`, order)
        .then((response) => {
          console.log('update')
          console.log(order)
          console.log(response.data)
        })
        .catch((error) => console.log(error));
  };