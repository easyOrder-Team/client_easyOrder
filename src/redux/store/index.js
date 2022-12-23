import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { categoryReducer } from "../categories/categoryReducer";
import { productReducer } from "../product/productReducer";
import { profileReducer } from "../profile/profileReducer";
import { orderReducer } from "../order/orderReducer";

const store = createStore(
  combineReducers({
    products: productReducer,
    categories: categoryReducer,
    profile: profileReducer,
    orderReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
