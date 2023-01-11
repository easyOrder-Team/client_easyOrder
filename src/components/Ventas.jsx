import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../redux/check/actions'
import { NavBar } from './NavBar'
import s from '../styles/Ventas.module.css'
import { useNavigate } from 'react-router-dom'

export const Ventas = () => {
    const dispatch = useDispatch()
    const {checks} =  useSelector(state => state.checkReducer)
    const navigate = useNavigate();

   useEffect(() => {
        dispatch(actions.getAllCheck())
   },[])

  return (
    <div>
        <NavBar/>
        {checks !== "There are no checks yet" ? checks.length ? checks.map(o => 
        <div key = {o.id_check} onClick={() => navigate(`/ventas/${o.id_check}`)}>
            
            <div className={s.container}>
              <h3>{o.id_check}</h3>
              <div>
                <p>{o.name} {o.lastname}</p>
                <h4>${o.total}</h4>
              </div>
              <p>{o.date}</p>
            </div>
        </div>) : <h1>Loading</h1> : <h1>There are no checks yet</h1>}
    </div>
  )
}
