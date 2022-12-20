import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { categoryReducer } from "../categories/categoryReducer";
import { productReducer } from "../product/productReducer";
import { profileReducer } from "../profile/profileReducer";
import { orderReducer } from "../order/orderReducer";

const store = createStore(
  combineReducers({
    productReducer,
    products: productReducer,
    productsCart: productReducer,
    categories: categoryReducer,
    profileReducer,
    orderReducer
  }),
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
