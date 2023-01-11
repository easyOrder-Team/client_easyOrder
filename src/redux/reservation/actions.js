import * as types from "../types";
import axios from "axios";

export const getReservationById = (id) => {
    return (dispatch) =>
      axios
        .get(`${import.meta.env.VITE_URL}/api/v1/reservation/${id}`)
        .then((response) => {
          console.log(response.data)
          dispatch({
            type: types.GET_RESERVAS_ACT_BY_ID_PROFILE,
            payload: response.data,
          });
        })
        .catch((error) => console.log(error));
  };

  export const deleteReservation = (id) => {
    return (dispatch) =>
      axios
        .delete(`${import.meta.env.VITE_URL}/api/v1/reservation/${id}`)
        .then((response) => {
          dispatch({
            type: types.DELETE_RESERVATION,
            payload: id,
          });
        })
        .catch((error) => console.log(error));
  };