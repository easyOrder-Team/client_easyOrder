import * as types from "../types";
import axios from "axios";


export const saveCheck = (check) =>{
  return {type: types.SAVE_CHECK, payload: check}
}

export const createCheck = (check) => {
    return (dispatch) =>
      axios
        .post(`http://localhost:3000/api/v1/checks`,check)
        .then((response) => {
          dispatch({
            type: types.CREATE_CHECK,
            payload: response.data,
          });
        })
        .catch((error) => console.log(error));
};

export const getAllCheck = () => {
  return (dispatch) => {
    axios.get(`http://localhost:3000/api/v1/checks`)
    .then(response => {
      dispatch({
        type: types.GET_ALL_CHECK,
        payload: response.data
      })
    })
  }
}
export const getCheck = (id) => {
  return (dispatch) => {
    axios.get(`http://localhost:3000/api/v1/checks?id=${id}`)
    .then(response => {
      dispatch({
        type: types.GET_CHECK,
        payload: response.data
      })
    })
  }
}