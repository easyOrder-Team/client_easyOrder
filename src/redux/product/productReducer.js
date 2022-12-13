import * as types from "../types";

const initialState = {
  products: [],
  detailProduct: {},
  changes: false,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };

    case types.SORT_BY_TIME_PREPARATION:
      let responsePrep = action.payload.response;
      let time = action.payload.time;
      let categoryPrep = action.payload.category;
      let supportTime = [];

      if (time === "min-max") {
        responsePrep.forEach((p) => {
          p.category.forEach((c) => {
            if (c.name.toLowerCase() === categoryPrep.toLowerCase()) {
              supportTime.push(p);
            }
          });
        });
        return {
          ...state,
          products: supportTime,
        };
      }
      if (time === "max-min") {
        let reverse = [...responsePrep].reverse();
        reverse.forEach((p) => {
          p.category.forEach((c) => {
            if (c.name.toLowerCase() === categoryPrep.toLowerCase()) {
              supportTime.push(p);
            }
          });
        });
        return {
          ...state,
          products: supportTime,
        };
      }

    case types.GET_PRODUCTS_BY_NAME:
      return {
        ...state,
        products: action.payload,
      };

    case types.FILTER_BY_CATEGORY:
      return {
        ...state,
        products: action.payload,
      };

    case types.GET_PRODUCT_BY_ID:
      return {
        ...state,
        detailProduct: action.payload,
      };

    case types.CLEAR_PRODUCTS:
      return {
        ...state,
        products: [],
      };

    case types.SORT_PRODUCTS_BY_PRICE:
      let response = action.payload.response;
      let price = action.payload.price;
      let category = action.payload.category;
      let supportPrice = [];

      if (price === "menor-mayor") {
        response.forEach((p) => {
          p.category.forEach((c) => {
            if (c.name.toLowerCase() === category.toLowerCase()) {
              supportPrice.push(p);
            }
          });
        });
        return {
          ...state,
          products: supportPrice,
        };
      }
      if (price === "mayor-menor") {
        let reverse = [...response].reverse();
        reverse.forEach((p) => {
          p.category.forEach((c) => {
            if (c.name.toLowerCase() === category.toLowerCase()) {
              supportPrice.push(p);
            }
          });
        });

        return {
          ...state,
          products: supportPrice,
        };
      }

    case types.DELETE_PRODUCT:
      let productDelete = state.products.filter((p) => p.id !== action.payload);

      return {
        ...state,
        products: productDelete,
      };

    default:
      return state;
  }
};
