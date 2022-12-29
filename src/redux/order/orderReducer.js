import * as types from "../types";

const initialState = {
  order: {},
  totalOrders: []
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
   case types.SAVE_ORDER:
    return{
        ...state,
        order: action.payload
    }
    case types.CREATE_ORDER:{
      return{
        ...state,
        order: {}
      }
    }
    case types.GET_ORDERS_ID_PROFILE:{
      return{
        ...state,
        totalOrders: action.payload
      }
    }
    default:
      return state;
  }

};
