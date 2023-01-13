import * as types from "../types";
import axios from "axios";

export const getSiteActivas = (id) => {
  return (dispatch) =>
    axios
      .get(`${import.meta.env.VITE_URL}/api/v1/site/avalible`)
      .then((response) => {
        dispatch({
          type: types.GET_SITE_ACTIVAS,
          payload: response.data,
        });
      })
      .catch((error) => console.log(error));
};

export const getSites = () => {
  return (dispatch) =>
    axios
      .get(`${import.meta.env.VITE_URL}/api/v1/site`)
      .then((response) => {
        dispatch({
          type: types.GET_SITES,
          payload: response.data,
        });
      })
      .catch((error) => console.log(error));
};

export const getNumTable = (id) => {
  return (dispatch) =>
    axios
      .get(`${import.meta.env.VITE_URL}/api/v1/site/${id}`)
      .then((response) => {
        dispatch({
          type: types.GET_NUM_TABLE,
          payload: response.data,
        });
      })
      .catch((error) => console.log(error));
};

export const deleteSite = (id) => {
  return (dispatch) =>
    axios
      .delete(`${import.meta.env.VITE_URL}/api/v1/site/${id}`)
      .then((id) => {
        dispatch({
          type: types.DELETE_TABLE,
          payload: id,
        });
      })
      .catch((error) => console.log(error));
};

export const createSite = (data) => {
  return (dispatch) =>
    axios
      .post(`${import.meta.env.VITE_URL}/api/v1/site`, data)
      .then((response) => {
        dispatch({
          type: types.CREATE_TABLE,
          payload: response.data,
        });
      })
      .catch((error) => console.log(error));
};

export const updateSite = (id, data) => {
  return (dispatch) =>
    axios
      .put(`${import.meta.env.VITE_URL}/api/v1/site/update/${id}`, data)
      .then((response) => {
        dispatch({
          type: types.UPDATE_TABLE,
          payload: response.data,
        });
      })
      .catch((error) => console.log(error));
};
