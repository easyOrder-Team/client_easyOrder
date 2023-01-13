import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { categoryReducer } from "../categories/categoryReducer";
import { productReducer } from "../product/productReducer";
import { profileReducer } from "../profile/profileReducer";
import { orderReducer } from "../order/orderReducer";
import { checkReducer } from "../check/checkReducer";
import { paymentReducer } from "../payment/paymentReducer";
import { reservationReducer } from "../reservation/reservationReducer";
import { reviewReducer } from "../review/reviewReducer";
import { siteReducer } from "../site/siteReducer";

const store = createStore(
  combineReducers({
    
    productsList: productReducer,
    categoryReducer,
    profileReducer,
    orderReducer,
    checkReducer,
    paymentReducer,
    reservationReducer,
    reviewReducer,
    siteReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
