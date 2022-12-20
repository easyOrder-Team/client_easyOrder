import React from "react";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { useSelector } from "react-redux";
import { getCategories } from "../redux/categories/actions";
import { useState } from "react";
import styleCreateProfile from "../styles/CreateProfile.module.css";
import { selectStyle } from "../styles/StyleSelectForm";
import { NavBar } from ".";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import * as actionsProfile from "../redux/profile/actions";
import axios from "axios";
export const CreateProfile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const profile = useSelector((state) => state.profileReducer.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(actionsProfile.getProfileById(user.email));
    }
  }, [user]);

  useEffect(() => {
    if (typeof profile === "object") {
      if (Object.entries(profile).length > 0) {
        navigate("/home");
      }
    }
  }, [profile]);

  const [localCategories, setLocalCategories] = useState([]);
  const [options, setOptions] = useState([]);
  const [activeButton, setActiveButton] = useState(true);
  const [data, setData] = useState({
    id_profile: "",
    name: "",
    lastname: "",
    phone: "",
    email: "",
    picture: "",
  });
  //id_profile, name, lastname, phone, email
  useEffect(() => {
    if (isAuthenticated) {
      setData({
        ...data,
        id_profile: user.email,
        name: user.email.includes(user.name) ? "" : user.given_name,
        lastname: user.email.includes(user.name) ? "" : user.family_name,
        email: user.email,
        picture: user.picture,
      });
    }
  }, [user]);

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

  const checkCel = (e) => {
    if (/[0-9 || .]/.test(e.target.value) || e.target.value === "") {
      handleInputChange(e);
    }
  };

  useEffect(() => {
    let validator;
    Object.values(data).forEach((element) => {
      if (element.length === 0) validator = true;
    });

    if (validator === true) {
      setActiveButton(true);
    } else {
      setActiveButton(false);
    }
  }, [data]);

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
      ["picture"]: url.secure_url,
    });
  };

  function submit(e) {
    e.preventDefault();
    fetch(`http://localhost:3000/api/v1/profile`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 201) {
          navigate("/home");
        }
      })
      .catch((err) => console.log(err));
  }
  if (isLoading) {
    return (
      <div className="containerSpin">
        <div className="spinner"></div>
      </div>
    );
  } else if (typeof profile !== "object") {
    return (
      <div id={styleCreateProfile.containerGlobalForm}>
        <div className={styleCreateProfile.containerNav}>
          <img
            className={styleCreateProfile.logo}
            src="https://res.cloudinary.com/dypjcpbis/image/upload/v1670886694/EasyOrder_BD/Recurso_1_l9yefi.svg"
            alt="logo_EasyOrder.svg"
          />
          <h1 className={styleCreateProfile.titulo}>Completar perfil</h1>
        </div>
        <div className={styleCreateProfile.containerForm}>
          <form className={styleCreateProfile.form} onSubmit={(e) => submit(e)}>
            <div className={styleCreateProfile.containerInfo}>
              {/* id_profile, name, lastname, phone, email */}
              <div>
                <img
                  className={styleCreateProfile.imageProfile}
                  src={data.picture}
                  alt="photo"
                />
                <div className={styleCreateProfile.globalContainerInputFile}>
                  <div className={styleCreateProfile.containerInputFile}>
                    <p className={styleCreateProfile.p}>Add imagen</p>
                    <input
                      className={styleCreateProfile.inputFileImage}
                      type="file"
                      accept="image/png , image/jpeg"
                      onChange={uploadImage}
                    ></input>
                  </div>
                </div>
              </div>
              <label className={styleCreateProfile.labels}>Nombre</label>
              <input
                className={styleCreateProfile.input}
                type="text"
                name="name"
                value={data.name}
                onChange={(e) => checkText(e)}
              ></input>
              <label className={styleCreateProfile.labels}>Apellidos</label>
              <input
                className={styleCreateProfile.input}
                type="text"
                name="lastname"
                value={data.lastname}
                onChange={(e) => checkText(e)}
              ></input>
              <label className={styleCreateProfile.labels}>
                Correo electronico
              </label>
              <input
                className={styleCreateProfile.input}
                type="text"
                name="email"
                value={data.email}
                onChange={(e) => checkText(e)}
              ></input>
              <label className={styleCreateProfile.labels}>Celular</label>
              <input
                className={styleCreateProfile.inputCelular}
                type="text"
                name="phone"
                value={data.phone}
                onChange={(e) => checkCel(e)}
              ></input>

              <div className={styleCreateProfile.containerButton}>
                <input
                  disabled={activeButton}
                  type="submit"
                  value="Aceptar"
                  className={
                    activeButton
                      ? styleCreateProfile.buttonCrearNoHover
                      : styleCreateProfile.buttonCrear
                  }
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
};
