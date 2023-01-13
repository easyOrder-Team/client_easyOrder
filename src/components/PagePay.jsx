import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavBar } from ".";
import s from "../styles/Cart.module.css";
import { useNavigate } from "react-router-dom";
import * as checkActions from "../redux/check/actions";
import * as orderActions from "../redux/order/actions";
const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

export const PagePay = () => {
  let total = 0;
  const dispatch = useDispatch();
  const [price, setPrice] = useState(0);
  const { productsCart } = useSelector((state) => state.productReducer);
  const { order } = useSelector((state) => state.orderReducer);
  const navigate = useNavigate();

  
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: total,
            currency: "MX",
          },
        },
      ],
    });
  };
  const onApprove = async (data, actions) => {
    actions.order.capture().then(function (details) {
      console.log(details);
      // dispatch(orderActions.getAllOrder())
      localStorage.setItem("order", JSON.stringify(order));
      dispatch(checkActions.saveCheck(details));
      navigate(`/confirmation/${details.id}`);
    });
  };

 
  const handleClick = (e) => {
    e.preventDefault();
    console.log("regresar al cart");
    navigate("/cart");
  };

  const handleClickMercadoPago = (e) => {
    e.preventDefault();
    localStorage.setItem("order", JSON.stringify(order));
    navigate("/payMercadoPago");
  };

  return (
    <div className={s.globalContainerCart}>
      <NavBar />
      <div className={s.containerCartsButtons}>
        <div className={s.link} onClick={handleClick}>
          Regresar al carrito de compras
        </div>
        {productsCart.map((p) => (
          <div key={p.id} className={s.container}>
            <div className={s.img}>
              <img src={p.image} alt={p.name} />
            </div>
            <div className={s.nameCantidad}>
              <h2>
                {p.name} (x{p.count})
              </h2>
            </div>
            <div className={s.price}>
              <span>${p.priceTotal}</span>
              <p>{(total = total + p.priceTotal)}</p>
            </div>
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
        
        <div className={s.payBtn}>
          <button
            className={s.payBtnMercadopago}
            onClick={handleClickMercadoPago}
          >
            <img
              className={s.logos}
              src="https://logodownload.org/wp-content/uploads/2019/06/mercado-pago-logo-4.png"
              alt=""
            />
          </button>
          <PayPalButton
            createOrder={(data, actions) => createOrder(data, actions)}
            onApprove={(data, actions) => onApprove(data, actions)}
          />
        </div>
      </div>
    </div>
  );
};

