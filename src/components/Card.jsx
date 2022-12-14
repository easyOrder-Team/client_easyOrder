import React from "react";
import style from "../styles/Card.module.css";
import * as actionProducts from "../redux/product/actions";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
export const Card = ({ name, price, image, description, edit, borrar, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formatoPesosMxn = (precio) => {
    return precio
      .toLocaleString("en", {
        style: "currency",
        currency: "MXN",
      })
      .slice(2, -3);
  };

  const handleDelete = (id) => {
    console.log("delete");
    dispatch(actionProducts.deleteProductAdmin(id));
    dispatch(actionProducts.getProducts());
  };

  const handleEdit = (id) =>{
    navigate(`/updateProduct/${id}`)
  }

  return (
    <div className={style.card__container}>
      <Link to={`/details/${id}`}>
      <div>
        <img className={style.card__img} src={image} alt="plato" />
      </div>
      </Link>

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
          <div className={style.card_flex}>
            <div>
              {edit && <button className={style.edit_btn} onClick={()=>handleEdit(id)}>{edit}</button>}
            </div>
            {!borrar ? (
              <span
                id={style.color__span}
                className="material-symbols-outlined"
              >
                add_circle
              </span>
            ) : (
              <button
                className={style.delete_btn}
                onClick={() => handleDelete(id)}
              >
                {borrar}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
