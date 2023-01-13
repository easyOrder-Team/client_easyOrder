import * as types from "../types";

const initialState = {
  profile: {},
  site: '',
  profiles:[]
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PROFILE_BY_ID:
      return {
        ...state,
        profile: action.payload,
      };
    case types.GET_ALL_PROFILES:
      return {
        ...state,
        profiles: action.payload,
      };
    case types.SAVESITE:
      return{
        ...state,
        site: action.payload
      }
    default:
      return state;
  }
};
