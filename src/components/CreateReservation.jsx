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
    const [startDate, setStartDate] = useState(new Date());
    const [reserv, setReserv] = useState({
        amount_persons: "",
        date: "",
        hour: "",
        id_profile: "",
        num_table: []
    });

    const maxDate = new Date()
    const dispatch = useDispatch();

    const reservation = (date) => {      
        dispatch(actions.createReservation(reserv));
        setReserv({ ...reserv,amount_persons: "", date: "", hour: "", id_profile: "", num_table: [] })
    }
    useEffect(() => {
        let reserva = startDate.toLocaleDateString('locales', { year:"numeric", month:"2-digit", day:"2-digit", hour: "2-digit", minute: "2-digit"})
        let dateReserva = reserva.split(",")
        setReserv({ ...reserv, date: dateReserva[0], hour: dateReserva[1], id_profile: profile.id_profile })
    }, [startDate])

    let handleChange = (e) => {
        let { name, value } = e.target
        e.preventDefault();
        setReserv({ ...reserv, [name]: value })
    };

    let handleClick = (e) => {
        if (e.target.checked) {
            setReserv({
                ...reserv,
                num_table: [...reserv.num_table, parseInt(e.target.name)]
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

    let { siteActivas } = useSelector((state) => state.siteReducer);


    // console.log(siteActivas)
    if (siteActivas.length !== 0) {
        return (
            <div>
                <NavBar />
                <div className={style.conteiner}>
                    <div className={style.modal}>
                        <h2 className={style.title}>Hace tu reservacion</h2>
                        <div>
                            <label>N° de comensales: </label>
                            <input className={style.comensales} type={"text"} name={"amount_persons"} value={reserv.amount_persons} onChange={handleChange} />
                        </div>
                        <div className={style.conteinerMap}>
                            {siteActivas.map((s) => {
                                return (
                                    <div className={style.table} key={s.id_site}>
                                        <input onClick={handleClick} multiple type="checkbox" name={s.num_table} value={s.id_site} />
                                        <h4>Mesa</h4>
                                        <h4>{s.amount_persons}px</h4>
                                    </div>)
                            })
                            }
                        </div>
                        <div className={style.datePicker}>
                            <DatePicker
                                inline
                                selected={startDate}
                                minDate={new Date()}
                                maxDate={maxDate.setDate(maxDate.getDate() + 15)}
                                onChange={(date) => setStartDate(date)}
                                showTimeSelect
                                dateFormat="dd/MM/yyyy HH:mm" />
                        </div>
                        <br />
                        <br />
                        <button className={style.button} onClick={reservation} >Reservar</button>
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