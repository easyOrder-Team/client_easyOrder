import "./App.css";
import { Route, Routes } from "react-router-dom";
import {
  Home,
  Landing,
  Login,
  Cards,
  ResultSearch,
  CreateProduct,
  Details,
  Profile,
  Cart,
  CreateProfile,
  OrderConfirmation,
  Pasarela
} from "./components";
import { PagePay } from "./components/PagePay";
import * as actions from "./redux/product/actions";
import * as actionsCategory from "./redux/categories/actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/cards/:category" element={<Cards />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<Home />} />
        <Route path="/createProduct" element={<CreateProduct />} />
        <Route path="resultsearch" element={<ResultSearch />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/createProfile" element={<CreateProfile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pagepay" element={<PagePay />} />
        <Route path="/confirmation/:id" element={<OrderConfirmation />} />
        <Route path="/payMercadoPago" element={<Pasarela/>} />
      </Routes>
    </div>
  );
}

export default App;
