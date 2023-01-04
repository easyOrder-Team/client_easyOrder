import * as types from "../types";

const initialState = {
  order: {}
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
   case types.SAVE_ORDER:
    return{
        ...state,
        order: action.payload
    }
    case types.CREATE_ORDER:
      return {
        ...state, 
        order: action.payload
      }
    case types.GET_ORDER:{
      return{
        ...state,
        order:  action.payload
      }
    }
    default:
      return state;
  }

};
