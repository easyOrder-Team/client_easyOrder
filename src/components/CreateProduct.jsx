import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { getCategories } from "../redux/categories/actions";
import styleForm from "../styles/Form.module.css";
import tableroFood from "../images/tablero_food.jpg";
import { selectStyle } from "../styles/StyleSelectForm";
import { NavBar } from "../components";
import { useNavigate } from "react-router-dom";
import * as actionProducts from "../redux/product/actions";

export const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [localCategories, setLocalCategories] = useState([]);
  const [options, setOptions] = useState([]);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    stock: "false",
    prep_time: "",
    categories: "",
  });

  useEffect(() => {
    if (localCategories.length > 0) {
      setData({
        ...data,
        ["categories"]: localCategories.map((category) => category.value),
      });
    } else {
      setData({
        ...data,
        ["categories"]: [],
      });
    }
  }, [localCategories]);

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const checkText = (e) => {
    if (/[A-Z || a-z || \s]/.test(e.target.value) || e.target.value === "") {
      handleInputChange(e);
    }
  };

  const checkPriceAndTime = (e) => {
    if (/[0-9 || .]/.test(e.target.value) || e.target.value === "") {
      handleInputChange(e);
    }
  };

  const uploadImage = async (e) => {
    const files = e.target.files;
    const dataFile = new FormData();
    dataFile.append("file", files[0]);
    dataFile.append("upload_preset", "EasyOrder_BD");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dypjcpbis/image/upload",
      {
        method: "POST",
        body: dataFile,
      }
    );

    const url = await res.json();
    setData({
      ...data,
      ["image"]: url.secure_url,
    });
  };

  let { categories } = useSelector((state) => state.categoryReducer);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      let options = categories.map((category) => {
        return {
          value: category.name_c,
          label: category.name_c,
        };
      });
      setOptions(options);
    }
  }, [categories]);

  const submit = (e) => {
    e.preventDefault();
    console.log("data", data);
    dispatch(actionProducts.createProduct(data));
    // let newData = JSON.stringify(data);
    // dispatch(actionProducts.createProduct(newData));
    // fetch("http://localhost:3000/api/v1/products", {
    //   method: "POST",
    //   body: JSON.stringify(data),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // }
    // ).then((response) => {
    //   if (response.statusText === "Created") {
    //     Swal.fire({
    //       title: "OK!",
    //       text: "El producto se ha creado con exito",
    //       icon: "success",
    //     }).then((response) => {
    //       if (response.isConfirmed) {
    //         navigate("/home");
    //       }
    //     });
    //   } else {
    //     Swal.fire({
    //       title: "Error!",
    //       text: "El producto NO se ha podido crear",
    //       icon: "error",
    //     });
    //   }
    // });
  };
  return (
    <div id={styleForm.containerGlobalForm}>
      <div className={styleForm.containerNav}>
        <NavBar />
      </div>
      <div className={styleForm.containerForm}>
        <form className={styleForm.form} onSubmit={(e) => submit(e)}>
          <div className={styleForm.containerImage}>
            <img
              className={styleForm.img}
              src={data.image ? data.image : tableroFood}
              alt=""
            />
          </div>

          <div className={styleForm.containerInfo}>
            <div className={styleForm.containerName_price}>
              <div className={styleForm.containerLabel}>
                <label className={styleForm.labels}>Nombre</label>
                <input
                  className={styleForm.inputName}
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={(e) => checkText(e)}
                ></input>
              </div>

              <div className={styleForm.containerLabel}>
                <div className={styleForm.containerPrice}>
                  <label
                    className={styleForm.labels + " " + styleForm.labelPrecio}
                  >
                    Precio
                  </label>
                  <input
                    className={styleForm.inputPrice}
                    type="number"
                    name="price"
                    value={data.price}
                    onChange={(e) => checkPriceAndTime(e)}
                  ></input>
                </div>
              </div>
            </div>

            <div className={styleForm.containerLabel}>
              <label className={styleForm.labels}>Descripcion</label>
              <textarea
                className={styleForm.inputDescription}
                type="text"
                name="description"
                value={data.description}
                onChange={(e) => checkText(e)}
              ></textarea>
            </div>

            <div className={styleForm.containerLabel}>
              <label className={styleForm.labels}>Categorias</label>
              <Select
                styles={selectStyle}
                isMulti
                options={options}
                onChange={(e) => setLocalCategories(e)}
              />
            </div>

            <div className={styleForm.containerName_price}>
              <div className={styleForm.containerLabel}>
                <label className={styleForm.labels}>
                  Tiempo de preparación
                </label>
                <div>
                  <input
                    className={styleForm.inputTime}
                    type="text"
                    name="prep_time"
                    value={data.prep_time}
                    onChange={(e) => checkPriceAndTime(e)}
                  ></input>
                  <label
                    className={styleForm.labels + " " + styleForm.labelMin}
                  >
                    min
                  </label>
                </div>
              </div>

              <div
                className={
                  styleForm.containerLabel + " " + styleForm.containerDisponible
                }
              >
                <label className={styleForm.labels}>Disponible</label>
                <select
                  name="stock"
                  id={styleForm.selectDisponible}
                  value={data.stock}
                  onChange={(e) => handleInputChange(e)}
                >
                  <option value="true">Si</option>
                  <option value="false"> No</option>
                </select>
              </div>
            </div>

            <div className={styleForm.containerLabelImage}>
              <label className={styleForm.labels}>Imagen</label>
              <div className={styleForm.containerInputFile}>
                <p className={styleForm.p}>Add imagen</p>
                <input
                  className={styleForm.inputFile}
                  type="file"
                  accept="image/png , image/jpeg"
                  onChange={uploadImage}
                ></input>
              </div>
            </div>

            <div className={styleForm.containerButton}>
              <button className={styleForm.buttonCrear}>Crear Producto</button>
            </div>
            <div className={styleForm.containerButton}>
              <button
                className={styleForm.buttonCancelar}
                onClick={() => navigate("/home")}
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
