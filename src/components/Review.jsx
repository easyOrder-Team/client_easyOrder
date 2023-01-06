import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import s from "../styles/OrderConfirmation.module.css";
import { useNavigate } from "react-router-dom";
import { Stars } from "./stars";
export const Review = () => {
<<<<<<< HEAD
  const { productsCart } = useSelector((state) => state.productsCart);
  let idProfile = JSON.parse(localStorage.getItem("profile")).id_profile;

=======
  
  const { productsCart } = useSelector((state) => state.productReducer);
  let idProfile = JSON.parse(localStorage.getItem("profile")).id_profile
  
>>>>>>> guillermolarrea
  return (
    <div className={s.root}>
      <div className={s.content}>
        {productsCart.map((p, i) => (
          <div key={p.id} className={s.container}>
            <div className={s.img}>
              <img src={p.image} alt={p.name} />
            </div>
            <div className={s.nameCantidad}>
              <h2>{p.name}</h2>
            </div>
            <div>
              <Stars id_profile={idProfile} products={p.id} />
            </div>
          </div>
        ))}
        <div className={s.photo}></div>
      </div>
    </div>
  );
};
