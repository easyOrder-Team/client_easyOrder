import React from "react";
import style from "../styles/Card.module.css";

export const Card = ({ name, price, image, description }) => {
  const formatoPesosMxn = (precio) => {
    return precio
      .toLocaleString("en", {
        style: "currency",
        currency: "MXN",
      })
      .slice(2, -3);
  };

  return (
    <div className={style.card__container}>
      <div>
        <img className={style.card__img} src={image} alt="plato" />
      </div>

      <div className={style.card_all_info}>
        <div className={style.card__info}>
          <h4 className={style.card_description_A}>
            <b>{name}</b>
          </h4>
          <br />
          <div className={style.card_description_B}>
            {description.slice(0, 20) + "..."}
          </div>
        </div>

        <div className={style.card_description_C}>
          <div>{formatoPesosMxn(price)}</div>
          <div>
            <span id={style.color__span} className="material-symbols-outlined">
              add_circle
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
