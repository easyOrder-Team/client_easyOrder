import React from "react";
import style from "../styles/Details.module.css";
import * as actions from "../redux/product/actions";
import { useDispatch } from "react-redux";

export const DeleteButton = ({ id }) => {
  const dispatch = useDispatch();
  const onClickDelete = (id) => {
    console.log("idddd", id);
    dispatch(actions.deleteProduct(id));
  };
  return (
    <div>
      <button className={style.btn1} onClick={() => onClickDelete(id)}>
        Delete dish
      </button>
    </div>
  );
};
