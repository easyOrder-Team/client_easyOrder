import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import * as actionsCategory from "../redux/categories/actions";
import * as actionsProducts from "../redux/product/actions";

import style from "../styles/Cards.module.css";
import { Card, NavBar, Pagination } from ".";

export const Cards = () => {
  const dispatch = useDispatch();
  const { category } = useParams();
  const { products } = useSelector((state) => state.productReducer);
  const { categories } = useSelector((state) => state.categoryReducer);
  const navigate = useNavigate();

  const [price, setPrice] = useState("");
  const [time, setTime] = useState("");
  const [cate, setCate] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const indexOfLastProduct = currentPage * productsPerPage; // 6
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage; // 0
  const currentProduct = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const paginate = (number) => {
    setCurrentPage(number);
  };

  useEffect(() => {
    dispatch(actionsCategory.getCategories());
    dispatch(actionsProducts.filterByCategory(category));
    dispatch(actionsCategory.getCategories());
  }, []);

  const handleSelectOrden = (e) => {
    setPrice("");
    setCate("");
    dispatch(actionsProducts.sortByTimePreparation(e.target.value, category));
  };

  const handleSelectPrice = (e) => {
    setTime("");
    setCate("");
    dispatch(actionsProducts.sortProductsByPrice(e.target.value, category));
  };
  const handleSelectCategory = (e) => {
    setTime("");
    setPrice("");
    navigate(`/cards/${e.target.value}`);
    dispatch(actionsProducts.filterByCategory(e.target.value));
  };
  return (
    <div>
      <div>
        <NavBar />
      </div>

      <div className={style.cards_container_select}>
        <select
          value={price}
          className={style.cards__select}
          onChange={(e) => {
            setPrice(e.target.value);
            handleSelectPrice(e);
          }}
        >
          <option value="">Orden por precio</option>
          <option value="menor-mayor">Menor a mayor</option>
          <option value="mayor-menor">Mayor a menor</option>
        </select>
      </div>
      <br />
      <div className={style.cards_container_select}>
        <select
          value={time}
          className={style.cards__select}
          onChange={(e) => {
            setTime(e.target.value);
            handleSelectOrden(e);
          }}
        >
          <option value="">Tiempo de preparación </option>
          <option value="min-max">Menor a mayor</option>
          <option value="max-min">Mayor a menor</option>
        </select>
      </div>
      <br />
      <div className={style.cards_container_select}>
        <select
          value={cate}
          className={style.cards__select}
          onChange={(e) => {
            setCate(e.target.value);
            handleSelectCategory(e);
          }}
        >
          <option value="">Categorias</option>
          {categories.length &&
            categories.map((cat) => (
              <option key={cat.name_c} value={cat.name_c}>
                {cat.name_c}
              </option>
            ))}
        </select>
      </div>
      <br />

      <div>
        {currentProduct.length ? (
          currentProduct.map((p) => (
            <Link key={p.id} to={`/details/${p.id}`}>
              <Card
                image={p.image}
                name={p.name}
                description={p.description}
                price={p.price}
              />
            </Link>
          ))
        ) : (
          <div className="containerSpin">
            <div className="spinner"></div>
          </div>
        )}
      </div>
      <Pagination
        productsPerPage={productsPerPage}
        products={products.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};
