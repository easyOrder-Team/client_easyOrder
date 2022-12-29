import React from 'react';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

const Pedidos = () => {
    const { totalOrders } = useSelector((state) => state.orderReducer);
    // console.log(totalOrders)
    if(totalOrders.length !== 0){
        return (
          <div>
              {totalOrders.map((o)=>
              <Link to={'/orderDetail'} key={o.id}>
                <dir>
                    <h2>Order made the day ?</h2>
                    <h3>{o.price}</h3>
                </dir>              
              </Link>
              )}
          </div>
        )
    }
}

export default Pedidos
