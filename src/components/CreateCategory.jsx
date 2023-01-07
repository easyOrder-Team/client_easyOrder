import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getCategories } from "../redux/categories/actions";
import { useState } from "react";
import { NavBar } from "../components";

export const CreateProduct = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categoryReducer);
  const [category, setCategory] = useState("");

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      const options = categories.map((category) => {
        return {
          value: category.name_c,
          label: category.name_c,
        };
      });
      setOptions(options);
    }
  }, [categories]);

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {};
  return (
    <div id={styleForm.containerGlobalForm}>
      <form className={styleForm.form} onSubmit={(e) => submit(e)}></form>
    </div>
  );
};
