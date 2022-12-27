import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as actions from "../redux/product/actions";
import style from "../styles/Details.module.css";
import s from "../styles/ItemCount.module.css";
import { NavBar } from ".";

export const Details = () => {
  const { id } = useParams();
  const navegate = useNavigate();
  const { detailProduct } = useSelector((state) => state.productReducer);

  const [count, setCount] = useState(1);

  const dispatch = useDispatch();

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
      id,
      image: detailProduct[0].image,
      name: detailProduct[0].name,
      price: detailProduct[0].price,
      priceTotal: detailProduct[0].price * count,
      count,
    };
    dispatch(actions.addProductCart(productSelected));
    setCount(1);
  };

  const handleToCart = (e) => {
    e.preventDefault();
    navegate("/cart");
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
              <h2 className={style.price}>{"$ " + detailProduct[0].price}</h2>
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
                <h3>Time</h3>
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
            <br />
          </div>
        ) : null}
        <div className={style.conteiner_buttons}>
          <button className={style.btn1} onClick={handleClick}>
            Add to cart
          </button>

          <button className={style.btn2} onClick={handleToCart}>
            Go pay
          </button>
        </div>
      </div>
    </div>
  );
};
