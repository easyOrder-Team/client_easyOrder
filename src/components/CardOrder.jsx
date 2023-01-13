import React from "react";
import h from "../styles/Admin.module.css";
import style from "../styles/Card.module.css";
import s from "../styles/Cart.module.css";
import { Link } from "react-router-dom";
export const CardOrder = ({ idMesa, image, name, price }) => {
  const formatoPesosMxn = (precio) => {
    return precio
      .toLocaleString("en", {
        style: "currency",
        currency: "MXN",
      })
      .slice(2, -3);
  };
  return (
    <div>
      {idMesa ? (
        <div className={`${h.card} ${h.card__order}`}>
          <h2>Mesa {idMesa}</h2>
        </div>
      ) : (
        <div>
          <div className={style.card__container}>
            <div>
              <img className={style.card__img} src={image} alt="plato" />
            </div>

            <div className={style.card_all_info}>
              <div className={style.card__info}>
                <h4 className={style.card_description_A}>
                  <b>{name}</b>
                </h4>
              </div>

              <div className={style.card_description_C}>
                <div>{formatoPesosMxn(price)}</div>
                <div className={style.card_flex}></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
