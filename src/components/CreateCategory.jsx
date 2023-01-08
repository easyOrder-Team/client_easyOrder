import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getCategories } from "../redux/categories/actions";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

export const CreateCategory = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categoryReducer);
  const [category, setCategory] = useState("");

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const handleSubmit = () => {
    e.preventDefault();
    const options = {
      method: "POST",
      body: JSON.stringify(category),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const match = [];
    if (categories.length !== 0) {
      categories.map((c) => {
        if (c === category) {
          match.push(c);
        }
      });
    }
    if (match.length === 0) {
      fetch(`http://localhost:3000/api/v1/products/category`, {
        method: "POST",
        body: category,
        headers: {
          "Content-Type": "application/json",
        },
      }).then((r) => {
        if (r.statusText === "Created") {
          Swal.fire({
            title: "OK!",
            text: "La categoria se ha creado con exito",
            icon: "success",
          }).then((r) => {
            if (r.isConfirmed) {
              navigate("/createProduct");
            }
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "La categoria no se ha podido crear",
            icon: "error",
          });
        }
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: `Ya existe la categoría ${category} `,
        icon: "error",
      });
    }
  };

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Nueva categoria</label>
        <input
          type="text"
          name="name"
          value={category}
          onChange={handleChange}
        ></input>
        <div>
          <button type="submit">Crear categoria</button>
        </div>
      </form>
    </div>
  );
};
