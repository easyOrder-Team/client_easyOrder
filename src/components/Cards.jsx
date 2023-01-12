import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import * as actionsCategory from "../redux/categories/actions";
import * as actionsProducts from "../redux/product/actions";
import style from "../styles/Cards.module.css";
import { Card, NavBar, Pagination } from ".";

export const Cards = () => {
  const dispatch = useDispatch();
  let { category } = useParams();
  const { products } = useSelector((state) => state.productsList);
  const { categories } = useSelector((state) => state.categoryReducer);
  const navigate = useNavigate();

  const [price, setPrice] = useState("");
  const [time, setTime] = useState("");
  const [cate, setCate] = useState("");

  //---------------------Henry change----------
  const [temporaryPrice, setTemporaryPrice] = useState("");
  const [temporaryRange, setTemporaryRange] = useState("");
  const [temporaryCat, setTemporaryCat] = useState("");

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

  //---------------------Henry change----------
  const handleSelectOrden = (e) => {
    if (temporaryCat !== "") {
      category = temporaryCat;
    }
    if (temporaryRange !== "") {
      let range = temporaryRange;
      range = JSON.parse(range);
      setPrice("");
      setCate("");
      setTemporaryPrice("");
      dispatch(
        actionsProducts.sortByTimePreparation(e.target.value, category, range)
      );
    } else {
      setPrice("");
      setCate("");
      setTemporaryPrice("");
      dispatch(actionsProducts.sortByTimePreparation(e.target.value, category));
    }
  };

  //---------------------Henry change----------
  const handleSelectPrice = (e) => {
    if (temporaryCat !== "") {
      category = temporaryCat;
    }
    setTime("");
    setCate("");
    setTemporaryRange("");
    setTemporaryPrice(e.target.value);
    dispatch(actionsProducts.sortProductsByPrice(e.target.value, category));
  };

  //---------------------Henry change----------
  const handleSelectPriceRange = (e) => {
    if (temporaryCat !== "") {
      category = temporaryCat;
    }
    setTemporaryRange(e.target.value);
    let range = e.target.value;
    range = JSON.parse(range);
    setTime("");
    setCate("");
    dispatch(
      actionsProducts.sortProductsByPrice(temporaryPrice, category, range)
    );
  };

  //-----------------Henry changes----------
  const handleSelectCategory = (e) => {
    if (e.target.value === "allProducts") {
      setTime("");
      setPrice("");
      setTemporaryPrice("");
      setTemporaryCat(e.target.value);
      navigate(`/cards/${e.target.value}`);
      dispatch(actionsProducts.getProducts());
    } else {
      setTime("");
      setPrice("");
      setTemporaryPrice("");
      setTemporaryCat("");
      navigate(`/cards/${e.target.value}`);
      dispatch(actionsProducts.filterByCategory(e.target.value));
    }
  };

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div className={style.orden_filter}>
        <div className="or_fi">
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
              <>
                {categories.length &&
                  categories.map((cat) => (
                    <option key={cat.name_c} value={cat.name_c}>
                      {cat.name_c}
                    </option>
                  ))}
                <option value="allProducts">Todos los productos</option>
              </>
            </select>
          </div>

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
        </div>

        <div className="or_fi">
          <div className={style.cards_container_select}>
            <select
              value={price}
              className={style.cards__select}
              onChange={(e) => {
                setPrice(e.target.value);
                handleSelectPrice(e);
              }}
            >
              {/* //---------------------Henry change---------- */}
              <option value="">Orden por precio</option>
              <option value="minor">Menor a mayor</option>
              <option value="mayor">Mayor a menor</option>
            </select>

            {/* //-----------------Henry change---------- */}
          </div>
          <div className={style.cards_container_select}>
            <select
              value={price}
              className={style.cards__select}
              onChange={(e) => {
                setPrice(e.target.value);
                handleSelectPriceRange(e);
              }}
            >
              <option value="">Rango precio</option>
              <option value='{"min":1,"max":1000}'>001 - 1000</option>
              <option value='{"min":1001,"max":"2000"}'>1001 - 2000</option>
              <option value='{"min":2001,"max":3000}'>2001 - 3000</option>
              <option value='{"min":3001,"max":4000}'>3001 - 4000</option>
              <option value='{"min":4001,"max":5000}'>4001 - 5000</option>
            </select>
          </div>
        </div>
      </div>

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
          //---------------------Henry change----------
          <div className={style.div_error}>
            <div className="containerSpin">
              {/* <div className="spinner"></div> */}
              <img
                src="https://res.cloudinary.com/dypjcpbis/image/upload/v1670886694/EasyOrder_BD/Recurso_1_l9yefi.svg"
                alt="logo_EasyOrder.svg"
              ></img>
              <br />
              <br />
              <br />
              <div>
                Lo sentimos no hay productos disponibles con estas
                características. Selecciona otra opción.
              </div>
            </div>
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
