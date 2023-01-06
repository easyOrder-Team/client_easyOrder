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

  let fecha = new Date().toLocaleDateString('locales', { year:"numeric", month:"numeric", day:"numeric"})

console.log(fecha)
  
 totalResevation.map((r)=>{
   if (fecha < r.date) {
       console.log(r.date);
   }
 })

  
  let id
  if (totalResevation.length !== 0) {
    return (
      <div className={style.globalContainerOrder}>
        <h2>Activas</h2>
      {totalResevation.map((r) =>
      fecha <= r.date ? 
          <div className={style.containerCard}  key={r.id}>
              <div className={style.container}>
                <h2 className={style.nameCantidada}>Reservation of the day {r.date}</h2>
                <h2 className={style.totala}>Hour {r.hour}</h2>
              </div>
            <button className={style.btnDelete} onClick={()=> handleDelete(id = r.id)}>
              <span className="material-symbols-outlined">delete</span>
            </button>
                <br />
          </div> : null
        )}
        <br />
        <br />
        <h2>History</h2>
        {totalResevation.map((r) =>
        fecha > r.date ?
          <div className={style.containerCard2}  key={r.id}>
              <div className={style.container}>
                <h2 className={style.nameCantidada}>Reservation of the day {r.date}</h2>
                <h2 className={style.totala}>Hour {r.hour}</h2>
              </div>
              </div> : null
               )}
      </div>
    )
  }
}

export default Reservas