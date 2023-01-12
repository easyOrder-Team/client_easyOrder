import * as types from "../types";

const initialState = {
  check: {},
  checks: []
};

export const checkReducer = (state = initialState, action) => {
  switch (action.type) {
   case types.CREATE_CHECK:
    return{
        ...state,
        check: action.payload
    }
    case types.SAVE_CHECK:
      return {
        ...state,
        check: action.payload
      }
    case types.GET_ALL_CHECK:
      return {
        ...state,
        checks: action.payload
      }
    case types.GET_CHECK:
      return {
        ...state,
        check: action.payload
      }
    default:
      return state;
  }

};