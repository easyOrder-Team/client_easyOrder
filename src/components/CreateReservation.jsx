import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import style from "../styles/CreateReservation.module.css";
import * as actions from "../redux/reservation/actions";
import * as actionsSite from "../redux/site/actions"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { NavBar } from "./NavBar"


const CreateReservation = () => {
    const { profile } = useSelector((state) => state.profileReducer);
    console.log(profile)
    const [reserv, setReserv] = useState({
        amount_persons: "",
        date: "",
        hour: "",
        id_profile: "",
        num_table: []
    });

    const maxDate = new Date()
    const dispatch = useDispatch();

    const reservation = ( date) => {
       
        let reserva = date.toLocaleString('es-AR', "dd/MM/yyyy HH:mm")
        let dateReserva = reserva.split(",")
        setReserv({ ...reserv, date: dateReserva[0], hour: dateReserva[1], id_profile: profile.id_profile })
        dispatch(actions.createReservation());
        console.log(reserv)
    }
    let handleChange = (e) => {
        let { name, value } = e.target
        e.preventDefault();
        setReserv({ ...reserv, [name]: value })
    };

    let handleClick = (e) => {
        if (e.target.checked) {
            setReserv({
                ...reserv,
                num_table: [...reserv.num_table, e.target.name]
            })
        } else {
            let table = [...reserv.num_table].filter(c => c !== e.target.name)
            setReserv({ ...reserv, num_table: [...table] })
        }
    };
    console.log(reserv)
    useEffect(() => {
        dispatch(actionsSite.getSiteActivas());
    }, [])

    const { siteActivas } = useSelector((state) => state.siteReducer);
    

    console.log(siteActivas)
    if (siteActivas.length !== 0) {
        return (
            <div>

                <NavBar/>
            <div className={style.conteiner}>
                <div className={style.modal}>
                    <h1 className={style.title}>Hace tu reservacion</h1>
                    <div>
                        <label>N° de comensales: </label>
                        <input type={"text"} name={"amount_persons"} value={reserv.amount_persons} onChange={handleChange} />
                    </div>
                    <div>
                        {siteActivas.map((s) => {
                            return(
                            <div key={s.id_site}>
                                <input onClick={handleClick} multiple type="checkbox" name={s.num_table} value={s.id_site} />
                                <h4>Mesa N°{s.num_table} para {s.amount_persons} personas</h4>
                            </div>)
                        })
                        }
                    </div>
                    <div className={style.datePicker}>
                        <DatePicker
                            inline
                            minDate={new Date()}
                            maxDate={maxDate.setDate(maxDate.getDate() + 15)}
                            onChange={(date) => reservation(date)}
                            showTimeSelect
                            dateFormat="dd/MM/yyyy HH:mm" />
                    </div>
                    <button onClick={reservation}>Reservar</button>
                </div>
            </div>
            </div>

        );
    } else {
        return (
            <h2>No Hay mesas disponibles</h2>
        )
    }
}
export default CreateReservation