import * as types from "../types";

const initialState = {
  infoPayment: {}
};

export const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
     case types.GET_INFO_PAYMENT:
      return{
          ...state,
          infoPayment: action.payload.data
      }
      
      default:
        return state;
    }
  
  };
  


