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