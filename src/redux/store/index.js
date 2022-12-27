import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { categoryReducer } from "../categories/categoryReducer";
import { productReducer } from "../product/productReducer";
import { profileReducer } from "../profile/profileReducer";
import { orderReducer } from "../order/orderReducer";
import { paymentReducer } from "../payment/paymentReducer";

const store = createStore(
  combineReducers({
    productReducer,
    categoryReducer,
    profileReducer,
    orderReducer,
    paymentReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
