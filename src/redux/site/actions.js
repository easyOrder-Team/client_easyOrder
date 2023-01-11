import * as types from "../types";
import axios from "axios";

export const getSiteActivas = (id) => {
  return (dispatch) =>
    axios
      .get(`http://localhost:3000/api/v1/site/avalible`)
      .then((response) => {
        dispatch({
          type: types.GET_SITE_ACTIVAS,
          payload: response.data,
        });
      })
      .catch((error) => console.log(error));
};
