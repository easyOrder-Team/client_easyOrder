import * as types from "../types";
import axios from "axios";

export const getReservationById = (id) => {
    return (dispatch) =>
      axios
        .get(`http://localhost:3000/api/v1/reservation/${id}`)
        .then((response) => {
          console.log(response.data)
          dispatch({
            type: types.GET_RESERVAS_ACT_BY_ID_PROFILE,
            payload: response.data,
          });
        })
        .catch((error) => console.log(error));
  };

  // export const deleteReservation = (id) => {
  //   console.log(id)
  //   return {
  //     type: types.DELETE_RESERVATION,
  //     payload: id,
  //   };
  // };
  
  export const deleteReservation = (id) => {
    return (dispatch) =>
      axios
        .delete(`http://localhost:3000/api/v1/reservation/${id}`)
        .then((response) => {
          dispatch({
            type: types.DELETE_RESERVATION,
            payload: id,
          });
        })
        .catch((error) => console.log(error));
  };