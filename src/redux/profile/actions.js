import * as types from "../types";
import axios from "axios";


export const getProfileById = (id) => {
  return (dispatch) =>
    axios
      .get(`${import.meta.env.VITE_URL}/api/v1/profile/${id}`)
      .then((response) => {
        dispatch({
          type: types.GET_PROFILE_BY_ID,
          payload: response.data,
        });
      })
      .catch((error) => console.log(error));
};
export const getAllProfiles = ( ) => {
  return (dispatch) =>
    axios
      .get(`${import.meta.env.VITE_URL}/api/v1/profile`)
      .then((response) => {
        dispatch({
          type: types.GET_ALL_PROFILES,
          payload: response.data,
        });
      })
      .catch((error) => console.log(error));
};
export const createProfile = () => {
  return (dispatch) =>
    axios
      .post(`${import.meta.env.VITE_URL}/api/v1/profile`,{

      })
      .then((response) => {
        dispatch({
          type: types.CREATE_PROFILE,
          payload: response.data,
        });
      })
      .catch((error) => console.log(error));
};

export const getSite = (id) => {
  return {type: types.SAVESITE, payload: id}
}



