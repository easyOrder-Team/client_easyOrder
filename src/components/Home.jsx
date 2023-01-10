import React from "react";
import s from "../styles/Home.module.css";
import { NavBar } from ".";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/product/actions";
import * as actionsProfile from "../redux/profile/actions";
import { useAuth0 } from "@auth0/auth0-react";
export const Home = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { productsList } = useSelector((state) => state.productsList);
  const profile = useSelector((state) => state.profileReducer.profile);
  const navigate = useNavigate();

  if (localStorage.getItem("profile") !== null) {
    if (JSON.parse(localStorage.getItem("profile")).superadmin) {
      navigate("/admin");
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(actionsProfile.getProfileById(user.email));
    }
  }, [user]);

  useEffect(() => {
    dispatch(actions.clearProduct());
    console.log(localStorage.getItem("site"));
    console.log(profile);
  }, []);
  useEffect(() => {
    if (profile && profile.hasOwnProperty("id_profile"))
      localStorage.setItem("profile", JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    dispatch(actions.getProducts());
  }, []);

  return (
    <div>
      {productsList?.length != 0 ? (
        <div>
          <div>
            <NavBar />
          </div>
          <div className={s.homecontainer}>
            <Link to={"/cards/entradas"}>
              <div className={`${s.card} ${s.card__entradas}`}>
                <h2>Entradas</h2>
              </div>
            </Link>

            <Link to={"/cards/ensaladas"}>
              <div className={`${s.card} ${s.card__ensaladas}`}>
                <h2>Ensaladas</h2>
              </div>
            </Link>

            <Link to={"/cards/sopas"}>
              <div className={`${s.card} ${s.card__sopas}`}>
                <h2>Sopas</h2>
              </div>
            </Link>

            <Link to={"/cards/principales"}>
              <div className={`${s.card} ${s.card__principales}`}>
                <h2>Platos principales</h2>
              </div>
            </Link>

            <Link to={"/cards/bebidas"}>
              <div className={`${s.card} ${s.card__bebidas}`}>
                <h2>Bebidas</h2>
              </div>
            </Link>

            <Link to={"/cards/postres"}>
              <div className={`${s.card} ${s.card__postres}`}>
                <h2>Postres</h2>
              </div>
            </Link>
          </div>
        </div>
      ) : (
        <div className="containerSpin">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};
