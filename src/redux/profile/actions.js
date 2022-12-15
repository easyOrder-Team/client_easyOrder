import * as types from "../types";
import axios from "axios";


export const getProfileById = (id) => {
  return (dispatch) =>
    axios
      .get(`http://localhost:3000/api/v1/profile/${id}`)
      .then((response) => {
        dispatch({
          type: types.GET_PROFILE_BY_ID,
          payload: response.data,
        });
      })
      .catch((error) => console.log(error));
};
export const createProfile = () => {
  return (dispatch) =>
    axios
      .post(`http://localhost:3000/api/v1/profile`,{

      })
      .then((response) => {
        dispatch({
          type: types.CREATE_PROFILE,
          payload: response.data,
        });
      })
      .catch((error) => console.log(error));
};


