import * as types from "../types";

const initialState = {
  products: [],
  detailProduct: {},
  changes: false,
  productsCart: [],
  response: "",
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };

    case types.SORT_BY_TIME_PREPARATION:
      let { responsePrep, time, categoryPrep } = action.payload;
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
      let { response, category } = action.payload;
      let supportPrice = [];

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

    case types.DELETE_PRODUCT:
      return {
        ...state,
        productsCart: state.productsCart.filter((p) => p.id !== action.payload),
      };

    case types.ADD_PRODUCT_CART:
      if (action.payload.length > 0) {
        return {
          ...state,
          productsCart: action.payload,
        };
      } else {
        let { id, count } = action.payload;
        const exist = state.productsCart.some((p) => p.id === id);
        if (exist) {
          let newProductCart = state.productsCart.map((p) => {
            if (p.id === id) {
              return {
                id: p.id,
                count: p.count + count,
                image: p.image,
                name: p.name,
                price: p.price,
                priceTotal: p.price * (p.count + count),
              };
            } else {
              return p;
            }
          });
          return {
            ...state,
            productsCart: newProductCart,
          };
        } else {
          return {
            ...state,
            productsCart: [...state.productsCart, action.payload],
          };
        }
      }

    case types.CLEAR_CART:
      return {
        ...state,
        productsCart: [],
      };

    case types.CREATE_PRODUCT:
      console.log("createRed", action.payload);
      return {
        ...state,
        response: action.payload,
      };

    case types.UPDATE_PRODUCT:
      return {
        ...state,
      };

    default:
      return state;
  }
};
