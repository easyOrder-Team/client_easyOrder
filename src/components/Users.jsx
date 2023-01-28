import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/profile/actions";
import users from "../styles/Users.module.css";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { NavBarAdmin } from "./NavBarAdmin";
import h from "../styles/Admin.module.css";
export const Users = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profiles = useSelector((state) => state.profileReducer.profiles);
  const profileAdmin = JSON.parse(localStorage.getItem("profile"));
  const [data, setData] = useState({
    state: "",
    superadmin: "",
  });

  useEffect(() => {
    dispatch(actions.getAllProfiles());
  }, []);

  const showDiv = (profile) => {
    let element = window.document.getElementById(
      `divInfo${profile.id_profile}`
    );
    element.style.display === "none"
      ? (element.style.display = "flex")
      : (element.style.display = "none");
    setData({
      ...data,
      state: profile.state,
      superadmin: profile.superadmin,
    });
  };

  const updateUser = (id) => {
    fetch(`${import.meta.env.VITE_URL}/api/v1/profile/updateProfile/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response === "The profile was successfully updated") {
          Swal.fire({
            title: "OK!",
            text: "El usuario se ha actualizado con exito",
            icon: "success",
          }).then((response) => {
            if (response.isConfirmed) {
              location.reload();
            }
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "El usuario NO se ha podido actualizar correctamente",
            icon: "error",
          });
        }
      });
  };

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  console.log(profiles);
  if (profiles.length > 0) {
    return (
      <div>
        <NavBarAdmin />
        <div>
          <span className={h.imageProfile}>
            <img src={profileAdmin.picture} alt="" />
          </span>
          <h4>Admin</h4>
          <h2>{`${profileAdmin.name} ${profileAdmin.lastname}`}</h2>
        </div>

        <div className={users.containerGlobalUsers}>
          <h1 className={users.tituloUsuarios}>Gestion de usuarios</h1>
          <div className={users.containerCardsUsers}>
            {profiles.map((profile) => {
              if (profile.email !== profileAdmin.email) {
                return (
                  <div className={users.globalContainerConDiv}>
                    <div className={users.cardUser}>
                      <img src={profile.picture} alt="" />
                      <div className={users.cardsUsersInfo}>
                        <h1>{`${profile.name} ${profile.lastname}`}</h1>
                        <p className={users.infoProfile}>
                          <br />
                          {profile.email}
                          <br />
                          <span>Rol: </span>{" "}
                          {profile.superadmin ? "Admin" : "Usuario"}
                          <br />
                          <span>Estado: </span>{" "}
                          <span
                            className={
                              profile.state
                                ? users.estadoActivacionActivo
                                : users.estadoActivacionInactivo
                            }
                          >
                            {profile.state ? "Activo" : "Inactivo"}
                          </span>
                        </p>
                      </div>
                      <div className={users.btnEditar}>
                        <div
                          onClick={() => showDiv(profile)}
                          className={`material-symbols-outlined ${users.simboloEditar}`}
                        >
                          Edit
                        </div>
                      </div>
                    </div>
                    <div
                      id={`divInfo${profile.id_profile}`}
                      className={users.divInfo}
                    >
                      <select
                        name="superadmin"
                        id=""
                        value={data.superadmin}
                        onChange={(e) => handleInputChange(e)}
                      >
                        <option value="true">Admin</option>
                        <option value="false">Usuario</option>
                      </select>
                      <select
                        name="state"
                        id=""
                        value={data.state}
                        onChange={(e) => handleInputChange(e)}
                      >
                        <option value="true">Activo</option>
                        <option value="false">Inactivo</option>
                      </select>
                      <button
                        className={users.btnAceptar}
                        onClick={() => updateUser(profile.id_profile)}
                      >
                        Aceptar
                      </button>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="containerSpin">
        <div className="spinner"></div>
      </div>
    );
  }
};
