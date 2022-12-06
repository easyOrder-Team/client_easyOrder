import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import * as actions from "../redux/product/actions";
import { NavBar } from './NavBar';
import style from "../styles/Details.module.css";


export const Details = () => {
  const {id}= useParams() 

  const dispatch= useDispatch()
  
  useEffect(()=> {
  dispatch(actions.getProductById(id))},[])
  const { detailProduct } = useSelector((state) => state.products);


  return (
    <div>
      <NavBar/>
      <div className={style.conteiner}>
      {detailProduct.length ? (
          <div>
            <img className={style.img} src={detailProduct[0].image} alt={detailProduct[0].name} />
          <div>
          <div className={style.conteiner_Name}>
            <h1>{detailProduct[0].name}</h1>
            <h2 className={style.price}>{detailProduct[0].price}</h2>
          </div>
          <div>
              <p className={style.description}>Description: {detailProduct[0].description}</p>
              <br />
              <h3>Time: {detailProduct[0].prep_time} min.</h3>            
          </div>
          </div>
          <br />
          <h2>Categories</h2>
            <div>
              { detailProduct[0].category ? (detailProduct[0].category.map((c)=>
            <div key={c.id} >
              {c.name}              
          </div>
          )) : null}
          <br />
        </div>
        </div>
      ): null
      }
        <div className={style.conteiner_buttons}>
          <button className={style.btn1}>Add to cart</button>
          <button className={style.btn2}>Go pay</button>
        </div>
      </div>
    </div>
)
};