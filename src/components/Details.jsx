import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as actions from "../redux/product/actions";
import style from "../styles/Details.module.css";
import { DeleteButton } from "./DeleteButton";
import { NavBar } from "./NavBar";

export const Details = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getProductById(id));
  }, []);
  const { detailProduct } = useSelector((state) => state.products);

  // //comentar o descomentar unas de las sisguientes líneas solo para ver el renderizado del botón delete(hay detalles)
  // const admins = ["henry"];
  // // const admins = [];

  return (
    <div>
      <h1>Details</h1>
      <NavBar />
      <div className={style.conteiner}>
        {detailProduct.length ? (
          <div>
            <img
              className={style.img}
              src={detailProduct[0].image}
              alt={detailProduct[0].name}
            />
            <div className={style.conteiner_Name}>
              <h1>{detailProduct[0].name}</h1>
              <h2 className={style.price}>{detailProduct[0].price}</h2>
              <div>
                <p className={style.description}>
                  Description: {detailProduct[0].description}
                </p>
                <p>Time: {detailProduct[0].prep_time} min.</p>
              </div>
            </div>
            <br />
            <h2>Categories</h2>
            <div>
              {detailProduct[0].category
                ? detailProduct[0].category.map((c) => (
                    <div key={c.id}>{c.name}</div>
                  ))
                : null}
              <br />
            </div>
          </div>
        ) : null}
        <div className={style.conteiner_buttons}>
          <button className={style.btn1}>Add to cart</button>
          <button className={style.btn2}>Go pay</button>
          {/* {admins.length > 0 && <DeleteButton id={id} />} */}
        </div>
      </div>
    </div>
  );
};
