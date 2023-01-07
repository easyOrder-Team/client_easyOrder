import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as actions from "../redux/product/actions";
import style from "../styles/Details.module.css";
import s from "../styles/ItemCount.module.css";
import m from "../styles/Mensaje.module.css";
import { NavBar, Mensaje } from ".";

export const Details = () => {
  const { id } = useParams();
  const navegate = useNavigate();
  const { detailProduct } = useSelector((state) => state.productReducer);

  const [count, setCount] = useState(1);
  const [mensaje, setMensaje] = useState("");

  const dispatch = useDispatch();

  const formatoPesosMxn = (precio) => {
    return precio
      .toLocaleString("en-US", {
        style: "currency",
        currency: "MXN",
      })
      .slice(2, -3);
  };

  let isAdmin = true;

  useEffect(() => {
    dispatch(actions.getProductById(id));
  }, []);

  const resta = () => {
    setCount(count - 1);
  };

  const suma = () => {
    setCount(count + 1);
  };

  const handleClick = (e) => {
    e.preventDefault();
    const productSelected = {
      id: parseInt(detailProduct[0].id),
      image: detailProduct[0].image,
      name: detailProduct[0].name,
      price: detailProduct[0].price,
      priceTotal: detailProduct[0].price * count,
      count,
    };
    setMensaje("Producto agregado al carrito");
    setTimeout(() => {
      setMensaje("");
    }, 2000);
    dispatch(actions.addProductCart(productSelected));
    setTimeout(() => {
      window.history.back();
      setCount(1);
    }, 1000);
  };

  const handleToCart = (e) => {
    e.preventDefault();
    navegate("/cart");
  };

  const handleEdit = (e) => {
    e.preventDefault();
    navegate(`/updateProduct/${id}`);
  };

  return (
    <div>
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
              <h2>{detailProduct[0].name}</h2>
              <h2 className={style.price}>
                {formatoPesosMxn(detailProduct[0].price)}
              </h2>
            </div>
            <div>
              <p className={style.description}>
                Description: {detailProduct[0].description}
              </p>
            </div>
            <div>
              <div className={style.time}>
                <span className={`material-symbols-outlined ${style.timeSpan}`}>
                  schedule
                </span>
                <h3>Tiempo</h3>
              </div>
              <div>
                <p> {detailProduct[0].prep_time} min.</p>
              </div>
            </div>
            <br />
            <h3>Cantidad</h3>
            <div className={s.counter}>
              <button disabled={count <= 1} className={s.btn} onClick={resta}>
                -
              </button>
              <span>{count}</span>
              <button className={s.btn} onClick={suma}>
                +
              </button>
            </div>
            <br />
            {mensaje && <Mensaje tipo="success">{mensaje}</Mensaje>}
            <br />
          </div>
        ) : null}


        {isAdmin ? (
          <div className={style.conteiner_buttons}>
            <button className={style.btn1} onClick={handleEdit}>
              Edit Product
            </button>
            <button className={style.btn2} onClick={handleDelete}>
              Delete Product
            </button>
          </div>
        ) : (
          <div className={style.conteiner_buttons}>
            <button className={style.btn1} onClick={handleClick}>
              Agregar al carrito
            </button>

          <button className={style.btn2} onClick={handleToCart}>
            Ir a pagar
          </button>
        </div>
      </div>
    </div>
  );
};
