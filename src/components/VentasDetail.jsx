import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link} from 'react-router-dom'
import * as actions from '../redux/check/actions'
import { NavBar } from './NavBar'

export const VentasDetail = () => {
  const dispatch = useDispatch()
  const {id} = useParams()
  const {check} = useSelector(state => state.checkReducer)
  useEffect(() => {
    dispatch(actions.getCheck(id))
  },[])
  return (
    <div>
      <NavBar/>
      {console.log(check)}
        {check.hasOwnProperty('id_check') ? 
        <div>
          <h1>Informacion de Factura</h1>
          <p>Numero de factura: {check.id_check}</p>
          <p>Usuario: {check.id_profile}</p>
          <p>Fecha de pago: {check.date}</p>
          <p>Pago total: ${check.total}</p>
          <p>Numero de order: {check.id_order}</p>
          <Link to={`/orderDetail/${check.id_order}`}>Mas informacion de la orden</Link>
        </div> : <h1>Loading</h1>}
    </div>
  )
}
