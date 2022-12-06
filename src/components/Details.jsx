import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import * as actions from "../redux/product/actions";


export const Details = () => {
  const {id}= useParams() 

  const dispatch= useDispatch()
  
  useEffect(()=> {
  dispatch(actions.getProductById(id))},[])
  const { detailProduct } = useSelector((state) => state.products);


  return (
    <div>
      {detailProduct.length ? (
        <div>
            <img src={detailProduct[0].image} alt={detailProduct[0].name} />
          <div>
          <h1>{detailProduct[0].name}</h1>
          <h2>{detailProduct[0].price}</h2>
          <div>
              <p>Description: {detailProduct[0].description}</p>
              <p>Time: {detailProduct[0].prep_time} min.</p>            
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
      <button>Add to cart</button>
      <button>Go pay</button>
    </div>
)
};