import * as types from "../types";

const initialState = {
  check: {}
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

    default:
      return state;
  }

};