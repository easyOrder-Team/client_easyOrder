import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import search from "../images/Search.svg";
import { useSelector } from "react-redux";
import s from "../styles/SearchBar.module.css";
import * as actions from "../redux/product/actions";
import { Link, useNavigate } from "react-router-dom";
import Autosuggest from "react-autosuggest";
import { useEffect } from "react";
import { all } from "axios";
import { notInitialized } from "react-redux/es/utils/useSyncExternalStore";

export const SearchBarAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productsList } = useSelector((state) => state.productsList);

  const allProducts = productsList.map((p) => {
    return {
      name: p.name,
      category: p.category[0].name,
    };
  });

  const [options, setOptions] = useState(allProducts); // ----------> Estado que almacena todos los productos existentes
  const [inputValue, setInputValue] = useState(""); // ----------> Estado que setea el valor del input para luego compararlo con las opciones de arriba
  const [selectedProduct, setSelectedProduct] = useState({}); // ----------> Estado que almacena la opcion seleccionada

  //---------------------- verificación y normalización de valor ingresado -----------------------------------------------------------
  const filterProduct = (inputValue) => {
    console.log("inputValue", inputValue);

    const clearedValue = inputValue.value.trim().toLowerCase(); // ----------> toma el valor ingresado y lo "limpia" eliminando espacios y mayusculas
    let data;
    let filteredProducts = options.filter((p) => {
      data = p.name; //-----------> toma el estado de todas las opciones

      if (
        data
          .toLocaleLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(clearedValue)
      ) {
        return p;
      }
    });
    return clearedValue.length === 0 ? [] : filteredProducts;
  };

  //---------------------- el estado product almacenará los valores que coindidan con lo ingresado -------------------------------------

  const onSuggestionsFetchRequested = (inputValue) => {
    setOptions(filterProduct(inputValue));
  };
  //---------------------- el estado product se borrará por completo ---------------------------------------------------------------------
  const onSuggestionsClearRequested = () => {
    setOptions(allProducts);
  };
  //---------------------- el estado product almacenará la opción seleccionada -----------------------------------------------------------
  const getSuggestionValue = (suggestion) => {
    return `${suggestion.name}`;
  };
  //---------------------- metodo que selecciona la opcion y la almacena en el estado -----------------------------------------------------

  const selectProduct = (suggestion) => {
    setSelectedProduct(suggestion.name);
  };
  //---------------------- este método renderiza las sugerencias --------------------------------------------------------------------------

  const renderSuggestion = (suggestion) => (
    <div
      onClick={() => {
        selectProduct(suggestion);
      }}
      className={s.theme}
    >
      {`${suggestion.name}`}
    </div>
  );

  const onChange = (e, { newValue }) => {
    setInputValue(newValue);
  };

  const inputProps = {
    className: s.input,
    placeholder: "Buscar un plato",
    value: inputValue,
    onChange,
  };

  //--------------------------------------------------------------------------------------------------------------------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue !== "") {
      dispatch(actions.getProductByName(inputValue));
      setInputValue("");
    }
  };

  return (
    <div className={s.container_search}>
      <form className={s.container} onSubmit={handleSubmit}>
        <div className={s.input}>
          <Autosuggest
            suggestions={options}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />
        </div>
        <button className={s.btn} type="submit">
          <span className="material-symbols-outlined">search</span>
        </button>
      </form>
    </div>
  );
};
