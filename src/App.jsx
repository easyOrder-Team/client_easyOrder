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
  Cart,
  OrderConfirmation,
  PasarelaMercadoPago,
  Scanner,
  Redirect
} from "./components";
import { PagePay } from "./components/PagePay"
import { Profile } from "./components/Profile"
import * as actions from "./redux/product/actions";
import * as actionsCategory from "./redux/categories/actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { CreateProfile } from "./components/CreateProfile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/:site" element={<Landing />} />
        <Route path="/cards/:category" element={<Cards />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<Home />} />
        <Route path="/createProduct" element={<CreateProduct />} />
        <Route path="resultsearch" element={<ResultSearch />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/createProfile" element={<CreateProfile/>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pagepay" element={<PagePay/>} />
        <Route path="/confirmation/:id" element={<OrderConfirmation />} />
        <Route path="/confirmation" element={<Redirect />} />
        <Route path="/payMercadoPago" element={<PasarelaMercadoPago />} />
        <Route path="/scannQR" element={<Scanner />} />
      </Routes>
    </div>
  );
}

export default App;