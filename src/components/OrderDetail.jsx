import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavBar } from ".";
import * as actions from "../redux/order/actions";
import { useParams } from 'react-router-dom';
import style from "../styles/OrderDetail.module.css";

const OrderDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch()
  const { orderById } = useSelector((state) => state.orderReducer);

  useEffect(() => {
    dispatch(actions.getOrderById(id));

  }, [orderById]);


  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div className={style.globalContainerOrder}>
        {orderById.length !== 0 ?
          orderById[0].products.length > 0 && orderById[0].products.map((p) =>
            <div className={style.container} key={p.id}>
              <div className={style.containerImg}>
                <img className={style.img} src={p.image} alt={p.name} />
              </div>
              <div className={style.containerName}>
                  <h2 className={style.nameCantidada}>{p.name} (X {p.amount})</h2>
                  {/* <h2 className={style.nameCantidada}>Amount: {p.amount}</h2>  */}
              </div>
              <div className={style.containerPrice}>
                  <h2 className={style.price}>$ {p.price}</h2>
              </div>
            </div> 
          ) : <h1>loading</h1>}
          <br />
          {orderById.length !== 0 ? (
        <div className={style.container2}>
          {/* <div className={style.containerImg}>
            <h2 className={style.totala}>Total</h2>
          </div> */}
          <div className={style.containerImg}>
            <h2 className={style.priceTotal}>$ {orderById[0].total}</h2>
          </div>
        </div>): <h1>loading</h1>}
      </div>
    </div>
  )
}

export default OrderDetail