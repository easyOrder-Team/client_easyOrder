import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import search from "../images/Search.svg";
import s from "../styles/SearchBar.module.css";
import * as actions from "../redux/product/actions";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const navegate = useNavigate();

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input !== "") {
      dispatch(actions.getProductByName(input));
      setInput("");
      navegate("/resultsearch");
    }
  };
  return (
    <div className={s.container_search}>
      <form className={s.container} onSubmit={handleSubmit}>
        <div className={s.containerInput}>
          <input
            className={s.input}
            type="text"
            name="search"
            placeholder="Buscar un plato"
            value={input}
            onChange={handleChange}
          />
        </div>
        <button className={s.btn} type="submit">
          <span className="material-symbols-outlined">search</span>
        </button>
      </form>
    </div>
  );
};
