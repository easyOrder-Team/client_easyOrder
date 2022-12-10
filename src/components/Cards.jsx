import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as actionsCategory from "../redux/categories/actions";
import * as actionsProducts from "../redux/product/actions";

import style from "../styles/Cards.module.css";
import { Card, NavBar } from ".";

export const Cards = () => {
  const dispatch = useDispatch();
  const { category } = useParams();

  const { products } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(actionsCategory.getCategories());
    dispatch(actionsProducts.filterByCategory(category));
  }, []);

  function handleSelectCategory(e) {
    dispatch(actionsProducts.getProductByCategory(e.target.value));
  }
  function handleSelectOrden(e) {
    dispatch(actionsProducts.sortByTimePreparation(e.target.value));
  }

  function handleSelectPrice(e) {
    dispatch(actionsProducts.sortProductsByPrice(e.target.value));
  }

  if (products.length > 0) {
    return (
      <div>
        <div>
          <NavBar />
        </div>
        <div className={style.cards_container_select}>
          <select
            className={style.cards__select}
            onChange={(e) => handleSelectPrice(e)}
          >
            <option>Orden por precio</option>
            <option value="menor-mayor">Menor a mayor</option>
            <option value="mayor-menor">Mayor a menor</option>
          </select>
        </div>
        <br />

        <div className={style.cards_container_select}>
          <select
            className={style.cards__select}
            onChange={(e) => handleSelectOrden(e)}
          >
            <option>Tiempo de preparación</option>
            <option value="min-max">Menor a mayor</option>
            <option value="max-min">Mayor a menor</option>
          </select>
        </div>
        <br />
        <div>
          <select
            className={style.cards__select}
            onChange={(e) => handleSelectCategory(e)}
          >
            <option>Categorías</option>
            {categories.length &&
              categories.map((cat, i) => {
                return (
                  <option
                    key={i}
                    className={style.cards__category}
                    value={cat.name_c}
                  >
                    {cat.name_c}
                  </option>
                );
              })}
          </select>
        </div>
        <br />
        <div>
          {products.length > 0 &&
            products.map((p) => (
              <Card
                key={p.id}
                image={p.image}
                name={p.name}
                description={p.description}
                price={p.price}
              />
            ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="containerSpin">
        <div className="spinner"></div>
      </div>
    );
  }
};
