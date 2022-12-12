import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home, Landing, Login, Cards, ResultSearch, CreateProduct, Details, Profile } from "./components";
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
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/createProduct" element={<CreateProduct />} />
        <Route path="resultsearch" element={<ResultSearch />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
