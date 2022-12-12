import * as types from "../types";

const initialState = {
  categories: [],
  changes: false,
};

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        changes: true,
      };

    default:
      return state;
  }
};