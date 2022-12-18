import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import { NavBar } from ".";
<<<<<<< HEAD
=======
import { useNavigate } from "react-router-dom";
>>>>>>> 5f833155734ec255e0e4bdc3b4975c4ed6640893
import s from "../styles/Cart.module.css";
const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
export const PagePay = () => {
  let total = 0;
  const [price, setPrice] = useState(0);
  const { productsCart } = useSelector((state) => state.productsCart);
<<<<<<< HEAD
=======
  const navigate = useNavigate();
>>>>>>> 5f833155734ec255e0e4bdc3b4975c4ed6640893

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: total,
<<<<<<< HEAD
            currency: 'MX'
          },

=======
            currency: "MX",
          },
>>>>>>> 5f833155734ec255e0e4bdc3b4975c4ed6640893
        },
      ],
    });
  };
  const onApprove = (data, actions) => {
    actions.order.capture().then(function (details) {
      console.log(details);
<<<<<<< HEAD
    });
  };

  const priceTotalCalculator = (productPrice) => {
    total = total + productPrice;
  };

  return (
    <div>
        <NavBar/>
=======
      navigate(`/confirmation/${details.id}`);
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log("regresar al cart");
    navigate("/cart");
  };

  return (
    <div className={s.root}>
      <NavBar />
      <div className={s.link} onClick={handleClick}>
        Regresar al carrito de compras
      </div>
>>>>>>> 5f833155734ec255e0e4bdc3b4975c4ed6640893
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
        <PayPalButton
          createOrder={(data, actions) => createOrder(data, actions)}
          onApprove={(data, actions) => onApprove(data, actions)}
        />
      </div>
    </div>
  );
<<<<<<< HEAD
};
=======
};
>>>>>>> 5f833155734ec255e0e4bdc3b4975c4ed6640893
