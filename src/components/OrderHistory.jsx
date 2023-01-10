import React from 'react';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import style from "../styles/OrderHistory.module.css";


const Pedidos = () => {
  const { totalOrders } = useSelector((state) => state.orderReducer);
 

  if (totalOrders.length !== 0) {
    return (
      <div className={style.globalContainerOrder}>
        {totalOrders.map((o) =>
          <div className={style.containerCard}  key={o.id}>
            <Link to={`/orderDetail/${o.id}`}>
              <div className={style.container}>
                <h2 className={style.nameCantidada}>Order of the day {o.date}</h2>
                <h2 className={style.totala}>$ {o.price}</h2>
                <br />
              </div>
            </Link>
          </div>
        )}
      </div>
    )
  }
}

export default Pedidos
