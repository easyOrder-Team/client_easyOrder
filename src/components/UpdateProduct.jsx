import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { getCategories } from "../redux/categories/actions";
import styleForm from "../styles/Form.module.css";
import { selectStyle } from "../styles/StyleSelectForm";
import { NavBar } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import * as actionProducts from "../redux/product/actions";

export const UpdateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [localCategories, setLocalCategories] = useState([]);
  const [options, setOptions] = useState([]);
  const [newData, setNewData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    stock: "false",
    prep_time: "",
    category: "",
  });

  const { id } = useParams();
  const { detailProduct } = useSelector((state) => state.productReducer);
  useEffect(() => {
    dispatch(actionProducts.getProductById(id));
  }, []);

  let { categories } = useSelector((state) => state.categoryReducer);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    if (localCategories.length > 0) {
      setNewData({
        ...newData,
        ["category"]: localCategories.map((category) => category.value),
      });
    } else {
      setNewData({
        ...newData,
        ["category"]: [],
      });
    }
  }, [localCategories]);

  const handleInputChange = (e) => {
    setNewData({
      ...newData,
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
    setNewData({
      ...newData,
      ["image"]: url.secure_url,
    });
  };

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

  let modifiedData = {};
  const modifyData = (newData) => {
    newData.name === ""
      ? (modifiedData.name = detailProduct[0].name)
      : (modifiedData.name = newData.name);
    newData.description === ""
      ? (modifiedData.description = detailProduct[0].description)
      : (modifiedData.description = newData.description);
    newData.price === ""
      ? (modifiedData.price = detailProduct[0].price)
      : (modifiedData.price = newData.price);
    newData.image === ""
      ? (modifiedData.image = detailProduct[0].image)
      : (modifiedData.image = newData.image);
    newData.stock === ""
      ? (modifiedData.stock = detailProduct[0].stock)
      : (modifiedData.stock = newData.stock);
    newData.prep_time === ""
      ? (modifiedData.prep_time = detailProduct[0].prep_time)
      : (modifiedData.prep_time = newData.prep_time);

    if (newData.category.length === 0) {
      let categs = [];
      detailProduct[0].category.map((c) => categs.push(c.name));
      modifiedData.category = categs;
    } else {
      modifiedData.category = newData.category;
    }
  };

  const submit = (e) => {
    e.preventDefault();
    modifyData(newData);
    dispatch(actionProducts.updateProduct(id, modifiedData));
    Swal.fire({
      type: "warning",
      title: "OK!",
      confirmButtonColor: "#f39c12",
      text: "El producto se ha actualizado correctamente",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/details/${id}`);
      }
    });
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
              src={newData.image ? newData.image : detailProduct[0].image}
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
                  // value={newData.name}
                  defaultValue={detailProduct[0].name}
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
                    // value={newData.price}
                    defaultValue={detailProduct[0].price}
                    onChange={(e) => checkPriceAndTime(e)}
                  ></input>
                </div>
              </div>
            </div>

            <div className={styleForm.containerLabel}>
              <label className={styleForm.labels}>Descripción</label>
              <textarea
                className={styleForm.inputDescription}
                type="text"
                name="description"
                // value={newData.description}
                defaultValue={detailProduct[0].description}
                onChange={(e) => checkText(e)}
              ></textarea>
            </div>

            <div className={styleForm.containerLabel}>
              <label className={styleForm.labels}>
                Elimine o seleccion nuevas categorías
              </label>
              <Select
                defaultValue={detailProduct[0].category.map((cat) => ({
                  label: cat.name,
                  value: cat.name,
                }))}
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
                    // value={newData.prep_time}
                    defaultValue={detailProduct[0].prep_time}
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
                  // value={newData.stock}
                  defaultValue={detailProduct[0].stock}
                  onChange={(e) => handleInputChange(e)}
                >
                  <option value="true">Si</option>
                  <option value="false">No</option>
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
                  // defaultValue={detailProduct[0].image}
                  onChange={uploadImage}
                ></input>
              </div>
            </div>

            <div className={styleForm.containerButton}>
              <button className={styleForm.buttonCrear}>
                Actualizar producto
              </button>
            </div>
            <div className={styleForm.containerButton}>
              <button
                className={styleForm.buttonCancelar}
                onClick={() => navigate(`/details/${id}`)}
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