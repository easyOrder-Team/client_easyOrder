import * as types from "../types";

const initialState = {
  products: [],
  supportProducts: [],
  detailProduct: {},
  changes: false,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        supportProducts: action.payload,
      };

    case types.SORT_BY_TIME_PREPARATION:
      let orderedProducts = [...state.supportProducts];

      orderedProducts = orderedProducts.sort((a, b) => {
        if (a.prep_time < b.prep_time)
          return action.payload === "min-max" ? -1 : 1;
        if (a.prep_time > b.prep_time)
          return action.payload === "min-max" ? 1 : -1;
        return 0;
      });

      return {
        ...state,
        products: orderedProducts,
      };

    case types.GET_PRODUCTS_BY_NAME:
      console.log(action.payload);
      return {
        ...state,
        products: action.payload,
      };

    case types.FILTER_BY_CATEGORY:
      console.log(action.payload);
      return {
        ...state,
        products: action.payload,
        supportProducts: action.payload,
      };

      case types.GET_PRODUCT_BY_ID:
      console.log(action.payload);
      return {
        ...state,
        detailProduct: action.payload,
      };

    case types.SORT_PRODUCTS_BY_PRICE:
      let priceProducts = [...state.supportProducts];

      priceProducts = priceProducts.sort((a, b) => {
        if (a.price < b.price) return action.payload === "menor-mayor" ? -1 : 1;
        if (a.price > b.price) return action.payload === "menor-mayor" ? 1 : -1;
        return 0;
      });

      return {
        ...state,
        products: priceProducts,
      };

    case types.CLEAR_PRODUCTS:
      return {
        ...state,
        products: [],
        supportProducts: [],
      };

    default:
      return state;
  }
};
