import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import * as actions from "../redux/order/actions";
import style from "../styles/OrderHistory.module.css";

const Pedidos = () => {
  const { totalOrders } = useSelector((state) => state.orderReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getAllOrder());
  }, []);

  console.log(totalOrders);

  if (totalOrders.length !== 0) {
    return (
      <div className={style.globalContainerOrder}>
        {totalOrders.map((o) => (
          <div className={style.containerCard} key={o.id}>
            <Link to={`/orderDetail/${o.id}`}>
              <div className={style.container}>
                <h2 className={style.nameCantidada}>
                  Order of the day {o.date}
                </h2>
                <h2 className={style.totala}>$ {o.price}</h2>
                <br />
              </div>
            </Link>
          </div>
        ))}
      </div>
    );
  }
};

export default Pedidos;
