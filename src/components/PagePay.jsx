import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import { NavBar } from ".";
import { useNavigate } from "react-router-dom";
import s from "../styles/Cart.module.css";
const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
export const PagePay = () => {
  let total = 0;
  const [price, setPrice] = useState(0);
  const { productsCart } = useSelector((state) => state.productsCart);
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
  const onApprove = (data, actions) => {
    actions.order.capture().then(function (details) {
      console.log(details);
      navigate(`/confirmation/${details.id}`);
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log("regresar al cart");
    navigate("/cart");
  };

  return (
    <div className={s.globalContainerCart}>
      <NavBar />
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
        <button className={s.payBtnMercadopago} onClick={()=>navigate("/payMercadoPago")} >
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
  );
};
