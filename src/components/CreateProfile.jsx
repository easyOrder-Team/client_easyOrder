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
import { CropProfileImage } from "./CropProfileImage";

export const CreateProfile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { profile } = useSelector((state) => state.profileReducer);
  const [urlImage, setUrlImage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    id_profile: "",
    name: "",
    lastname: "",
    phone: "",
    email: "",
    picture: "",
  });
  let profileImage = localStorage.getItem("profileImage");

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(actionsProfile.getProfileById(user.email));
    }
  }, [user]);

  useEffect(() => {
    if (typeof profile === "object") {
      if (Object.entries(profile).length > 0) {
        console.log(profile);
        profile.superadmin ? navigate("/admin") : navigate("/home");
      }
    }
  }, [profile]);

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

  useEffect(() => {
    if (profileImage !== null) {
      console.log(profileImage);
      setData({
        ...data,
        picture: profileImage,
      });
    }
  }, [profileImage]);

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


  const createUrl = async (e) => {
    localStorage.removeItem("profileImage");
    setUrlImage(URL.createObjectURL(e.target.files[0]));
  };

  function submit(e) {
    e.preventDefault();
    fetch(`${import.meta.env.VITE_URL}/api/v1/profile`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 201) {
          localStorage.removeItem("profileImage");
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
    if (urlImage !== null && profileImage === null) {
      return <CropProfileImage urlImage={urlImage} />;
    } else {
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
            <form
              className={styleCreateProfile.form}
              onSubmit={(e) => submit(e)}
            >
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
                        onChange={createUrl}
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
                    type="submit"
                    value="Aceptar"
                    className={styleCreateProfile.buttonCrear}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      );
    }
  }
};
