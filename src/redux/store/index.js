import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { categoryReducer } from "../categories/categoryReducer";
import { productReducer } from "../product/productReducer";
import { profileReducer } from "../profile/profileReducer";

const store = createStore(
  combineReducers({
    productReducer,
    products: productReducer,
    productsCart: productReducer,
    categories: categoryReducer,
    profileReducer
  }),
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
