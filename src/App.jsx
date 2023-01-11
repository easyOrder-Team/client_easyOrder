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
  Redirect,
  Review,
  Admin,
  Products,
  ProtectedRoute,
  // ReviewDetail,
  // OrderDetail
  UpdateProduct,
} from "./components";
import { PagePay } from "./components/PagePay";
import { Profile } from "./components/Profile";
import * as actions from "./redux/product/actions";
import * as actionsCategory from "./redux/categories/actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { CreateProfile } from "./components/CreateProfile";
import OrderDetail from "./components/OrderDetail";
import ReviewDetail from "./components/ReviewDetails";
import { Ventas } from "./components/Ventas";
import { VentasDetail } from "./components/VentasDetail";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();
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
        <Route
          path="/pagepay"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <PagePay />
            </ProtectedRoute>
          }
        />
        <Route path="/confirmation/:id" element={<OrderConfirmation />} />
        <Route path="/confirmation" element={<Redirect />} />
        <Route path="/payMercadoPago" element={<PasarelaMercadoPago />} />
        <Route path="/scannQR" element={<Scanner />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path="/products" element={<Products />} />
        <Route path="/review" element={<Review />} />
        <Route path="/orderDetail/:id" element={<OrderDetail />} />
        <Route path="/reviewDetail/:id" element={<ReviewDetail />} />
        <Route path="/ventas" element={<Ventas />} />
        <Route path="/ventas/:id" element={<VentasDetail/>} />
        <Route path="/updateProduct/:id" element={<UpdateProduct />} />
      </Routes>
    </div>
  );
}

export default App;
