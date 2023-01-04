import * as types from "../types";

const initialState = {
    totalReview: []
  };

  export const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
      case types.GET_REVIEW_BY_ID :
        return {
          ...state,
          totalReview: action.payload,
        };
        default:
            return state;
        }
    }

