import * as types from "../types";

const initialState = {
  siteActivas: [],
  allSites: [],
  siteDetail: [],
};

export const siteReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_SITE_ACTIVAS:
      return {
        ...state,
        siteActivas: action.payload,
      };

    case types.GET_SITES:
      return {
        ...state,
        allSites: action.payload,
      };

    case types.GET_NUM_TABLE:
      return {
        ...state,
        siteDetail: action.payload,
      };

    default:
      return state;
  }
};
