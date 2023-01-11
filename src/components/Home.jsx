import React from "react";
import s from "../styles/Home.module.css";
import { NavBar } from ".";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/product/actions";

export const Home = () => {
  const dispatch = useDispatch();
  const { productsList } = useSelector((state) => state.productsList);
  const profile = useSelector((state) => state.profileReducer.profile);
  useEffect(() => {
    dispatch(actions.clearProduct());
  }, []);
  useEffect(() => {
    if (profile && profile.hasOwnProperty("id_profile"))
      localStorage.setItem("profile", JSON.stringify(profile));
  }, []);

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
        <div>Loading...</div>
      )}
    </div>
  );
};
