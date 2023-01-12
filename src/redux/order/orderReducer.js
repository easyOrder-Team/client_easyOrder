import * as types from "../types";

const initialState = {
  order: {},
  totalOrders: [],
  orderById: [],
  activeOrders: [],
  changes: false,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_ORDER:
      return {
        ...state,
        order: action.payload,
      };
    case types.CREATE_ORDER:
      return {
        ...state,
        order: action.payload,
      };
    case types.GET_ORDER: {
      return {
        ...state,
        order: action.payload,
      };
    }
    case types.GET_ORDERS_ID_PROFILE: {
      return {
        ...state,
        totalOrders: action.payload,
      };
    }
    case types.GET_ORDER_BY_ID: {
      console.log(action.payload);
      return {
        ...state,
        orderById: action.payload,
      };
    }
    case types.GET_ALL_ORDERS: {
      return {
        ...state,
        totalOrders: action.payload,
      };
    }
    case types.GET_ACTIVE_ORDERS:
      console.log(action.payload);
      return {
        ...state,
        activeOrders: action.payload,
      };
    default:
      return state;
  }
};
