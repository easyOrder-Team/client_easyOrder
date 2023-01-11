import * as types from "../types";

const initialState = {
  siteActivas: [],
};

export const siteReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_SITE_ACTIVAS:
      return {
        ...state,
        siteActivas: action.payload,
      };
    default:
      return state;
  }
};
