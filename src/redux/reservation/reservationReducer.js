import * as types from "../types";

const initialState = {
    totalResevation: []
  };

  export const reservationReducer = (state = initialState, action) => {
    switch (action.type) {
      case types.GET_RESERVAS_ACT_BY_ID_PROFILE :
        return {
          ...state,
          totalResevation: action.payload,
        };
        case types.DELETE_RESERVATION:
          console.log(action.payload)
          return {
            ...state,
            totalResevation: state.totalResevation.filter((r) => r.id !== action.payload),
          };
        default:
            return state;
        }
    }