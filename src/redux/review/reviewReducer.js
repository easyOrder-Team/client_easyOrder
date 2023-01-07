import * as types from "../types";

const initialState = {
    totalReview: [],
    reviewById: []
  };

  export const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
      case types.GET_REVIEW_BY_ID_PROFILE :
        // console.log(action.payload)
        return {
          ...state,
          totalReview: action.payload,
        };
        case types.GET_REVIEW_BY_ID_REVIEW :
          console.log(action.payload)
        return {
          ...state,
          reviewById: action.payload,
        };
        default:
            return state;
        }
    }

