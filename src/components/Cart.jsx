import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavBar } from ".";
import s from "../styles/Cart.module.css";
import st from "../styles/ItemCount.module.css";
import { useNavigate } from "react-router-dom";
import * as orderActions from "../redux/order/actions";
import { useEffect } from "react";

import * as actions from "../redux/product/actions";

export const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  var aux = 0;

  const state = useSelector((state) => state.profileReducer.state);
  const { productsCart } = useSelector((state) => state.products);
  const [total, setTotal] = useState(0);
  const [product, setProduct] = useState(productsCart);

  useEffect(() => {
    const productsLS = JSON.parse(localStorage.getItem("product")) ?? [];
    if (productsLS.length > 0 && productsCart.length === 0) {
      dispatch(actions.addProductCart(productsLS));
    }
  }, []);

  useEffect(() => {
    if (product) {
      localStorage.setItem("product", JSON.stringify(product));
    }
  }, [product]);

  const [order, setOrder] = useState({
    id_mesa: parseInt(localStorage.getItem("site")),
    id_profile: state.profile.id_profile,
    total: total,
    products: product,
  });

  useEffect(() => {
    console.log("dispach1");
    setProduct(productsCart);
  }, [productsCart]);

  useEffect(() => {
    actualizarTotal();
    setOrder({ ...order, products: productsCart, total: total });
  }, [product, total]);

  const resta = (e) => {
    console.log(e.target.value);
    const piMenos = product.findIndex((p) => p.id === e.target.value);
    actualizarCart(e.target.value, piMenos, false);
  };

  const suma = (e) => {
    console.log(e.target.value);
    const piMas = product.findIndex((p) => p.id === e.target.value);
    actualizarCart(e.target.value, piMas, true);
    actualizarTotal();
  };

  const actualizarCart = (id, i, sumar) => {
    let actual = product[i];
    let newState = product;
    actual.count = sumar ? actual.count + 1 : actual.count - 1;
    actual.priceTotal = actual.price * actual.count;
    newState[i] = actual;
    setProduct([...newState]);
    setOrder({ ...order, products: productsCart, total: total });
    actualizarTotal();
  };

  const actualizarTotal = () => {
    aux = 0;
    if (product.length !== 0) {
      for (let i = 0; i < product.length; i++) {
        aux = aux + product[i].priceTotal;
      }
      return setTotal(aux);
    }
    return setTotal(aux);
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log("pedido exitoso");
    console.log(localStorage.getItem("site"));
    dispatch(orderActions.saveOrder(order));
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleToPay = (e) => {
    e.preventDefault();
    console.log("pagando...");
    navigate("/pagepay");
  };

  return (
    <div className={s.globalContainerCart}>
      <NavBar />
      {product.length &&
        product.map((p) => (
          <div key={p.id} className={s.container}>
            <div className={s.img}>
              <img src={p.image} alt={p.name} />
            </div>
            <div className={s.nameCantidad}>
              <h2>{p.name}</h2>
              <div className={s.cantidad}>
                <h3>Amount: </h3>
                <div className={st.counter}>
                  <button
                    disabled={p.count <= 1}
                    className={st.btn}
                    onClick={resta}
                    value={p.id}
                  >
                    -
                  </button>
                  <span>{p.count}</span>
                  <button value={p.id} className={st.btn} onClick={suma}>
                    +
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div className={s.price}>
                <span>${p.priceTotal}</span>
                <p>{total}</p>
              </div>
              <button
                className={s.btnDelete}
                onClick={() => handleDelete(p.id)}
              >
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
            <br />
          </div>
        ))}
      <div className={s.total}>
        <div>
          <h3>Total</h3>
        </div>
        <div>
          <span>${total}</span>
        </div>
      </div>

      <div className={s.conteiner_buttons}>
        <button className={s.btn1} onClick={handleClick}>
          Make an Order
        </button>

        <button className={s.btn2} onClick={handleToPay}>
          Go pay
        </button>
      </div>
    </div>
  );
};
