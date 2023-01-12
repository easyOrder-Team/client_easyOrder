import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import s from "../styles/Review.module.css";
import { useNavigate } from "react-router-dom";
import { Stars } from "./Stars.jsx";
export const Review = () => {
  const { productsCart } = useSelector((state) => state.productsList);
  let idProfile = JSON.parse(localStorage.getItem("profile")).id_profile;

  return (
    <div className={s.root}>
      <div className={s.content}>
        {productsCart.map((p, i) => (
          <div class="accordion accordion-flush" id="accordionFlushExample">
            <div class={`accordion-item ${s.acordeon}`}>
              <h2 class="accordion-header" id="flush-headingOne">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-mdb-toggle="collapse"
                  data-mdb-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                >
                  <div className={s.img}>
                    <img src={p.image} alt={p.name} />
                  </div>
                  <div className={s.nameCantidad}>
                    <h2>{p.name}</h2>
                  </div>
                </button>
              </h2>
              <div
                id="flush-collapseOne"
                class="accordion-collapse collapse"
                aria-labelledby="flush-headingOne"
                data-mdb-parent="#accordionFlushExample"
              >
                <div class="accordion-body">
                  <Stars id_profile={idProfile} products={p.id} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
