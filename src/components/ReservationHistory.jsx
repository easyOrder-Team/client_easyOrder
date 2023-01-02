import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import style from "../styles/ReservationHistory.module.css";
import * as actions from "../redux/reservation/actions";



const Reservas = () => {
  const { totalResevation } = useSelector((state) => state.reservationReducer);
  console.log(totalResevation)
  const dispatch = useDispatch();
  const handleDelete = () =>{
    dispatch(actions.deleteReservation(id))
  }
 let id
  if (totalResevation.length !== 0) {
    return (
      <div className={style.globalContainerOrder}>
        {totalResevation.map((r) =>
          <div className={style.containerCard}  key={r.id}>
              <div className={style.container}>
                <h2 className={style.nameCantidada}>Reservation of the day {r.date}</h2>
                <h2 className={style.totala}>Hour {r.hour}</h2>
              </div>
            <button className={style.btnDelete} onClick={()=> handleDelete(id = r.id)}>
              <span className="material-symbols-outlined">delete</span>
            </button>
                <br />
          </div>
        )}
      </div>
    )
  }
}

export default Reservas