import React, { useState } from "react";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/product/actions";
import s from "../styles/OrderConfirmation.module.css";
import * as actions from "../redux/product/actions";
import * as actionsPayment from "../redux/payment/actions";
import * as orderActions from "../redux/order/actions";
import * as checkActions from "../redux/check/actions";

export const OrderConfirmation = () => {
  let total = 0;
  const [price, setPrice] = useState(0);
  const { productsCart } = useSelector((state) => state.productsCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const products = JSON.parse(localStorage.getItem("products"));
  const order = JSON.parse(localStorage.getItem('order'));
  const profile = JSON.parse(localStorage.getItem('profile'));
  const bill = useSelector((state) => state.checkReducer.check);
  const mercadoPagoBill = useSelector(
    (state) => state.paymentReducer.infoPayment
  );

  useEffect(() => {
    dispatch(actionsPayment.getPaymentInfo(id));
  }, []);
  useEffect(() => {
    if (productsCart.length === 0 && products) {
      products.map((product) => {
        dispatch(actions.addProductCart(product));
      });
    }
  }, [products]);

  const deleteLocaleStorage = () => {
    localStorage.removeItem('contador')
    localStorage.removeItem('tempTotal')
    localStorage.removeItem('order')
    localStorage.removeItem('product')
  }
  const handleClick = (e) => {
    e.preventDefault();
    let check = {};
    if (!mercadoPagoBill.hasOwnProperty('order')) {
      check = {
        id_check: bill.id,
        name: bill.payer.name.given_name,
        lastname: bill.payer.name.surname,
        date: bill.create_time,
        total: bill.purchase_units[0].amount.value,
        email: bill.payer.email_address,
        id_order: order.order.id_orders,
      };
      console.log(check);
      console.log("regresar al home");
      dispatch(clearCart());
      deleteLocaleStorage()
      dispatch(checkActions.createCheck(check));
    }else{
      if(mercadoPagoBill.payer.first_name === null){
        check = {
          id_check: `${id}`,
          name: mercadoPagoBill.card.cardholder.name.split(' ')[0],
          lastname: mercadoPagoBill.card.cardholder.name.split(' ')[1],
          date: mercadoPagoBill.date_approved,
          total: mercadoPagoBill.transaction_amount,
          email: profile.id_profile,
          id_order: order.order.id_orders,
        };

        console.log(check);
        console.log(order.order.id_orders)
        console.log("regresar al home");
        dispatch(clearCart());
        deleteLocaleStorage()
        dispatch(checkActions.createCheck(check));
      }
      // check = {
      //   id_check: id,
      //   name: mercadoPagoBill,
      //   lastName: bill.payer.name.surname,
      //   date: bill.create_time,
      //   total: bill.purchase_units[0].amount.value,
      //   email: bill.payer.email_address,
      //   id_order: order.order.id_orders,
      // };

    }


    navigate("/home");
  };

  return (
    <div className={s.root}>
      <div className={s.content}>
        <img
          className={s.logo}
          src="https://res.cloudinary.com/dypjcpbis/image/upload/v1670886694/EasyOrder_BD/Recurso_1_l9yefi.svg"
          alt="logo_EasyOrder.svg"
        />
        <h1 className={s.title}>¡PEDIDO EXITOSO!</h1>
        <p className={s.description}>
          ¡Muchas gracias! Su pedido con la factura <b>{id}</b> se ha realizado
          exitosamente, asímismo, queremos recordarte que tu pedido consta de:{" "}
        </p>
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
        <button className= {s.btn1} onClick = {() => navigate('/review')}>Te gustaria puntuarnos?</button>
        <button className={s.btn1} onClick={handleClick}>
          CONTINUAR
        </button>
        <div className={s.photo}></div>
      </div>
    </div>
  );
};
