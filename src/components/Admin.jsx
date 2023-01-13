import React from "react";
import s from "../styles/NavBar.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import h from "../styles/Admin.module.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { NavBarAdmin } from "./NavBarAdmin";
export const Admin = () => {
  const [modalVisivility, setmodalVisivility] = useState("modalMenu");
  const { logout, isAuthenticated, loginWithRedirect, isLoading } = useAuth0();
  const profile = useSelector((state) => state.profileReducer.profile);
  const navigate = useNavigate();
  let location = useLocation().pathname;

  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(profile));
  });

  if (isLoading) {
    <div className="containerSpin">
      <div className="spinner"></div>
    </div>;
  } else {
    if (isAuthenticated) {
      if (!profile.superadmin) {
        navigate("/home");
      } else if (
        location !== "/createProduct" &&
        !location.includes("/cards") &&
        location !== "/profile" &&
        location !== "/scannQR" &&
        location !== "/selectPayMethod"
      ) {
        return (
          <div>
          <NavBarAdmin/>
            <div>
              <span className={h.imageProfile}>
                <img src={profile.picture} alt="" />
              </span>
              <h4>Admin</h4>
              <h2>{`${profile.name} ${profile.lastname}`}</h2>
            </div>
            <div className={h.homecontainer}>
              <Link to={"/products"}>
                <div className={`${h.card} ${h.card__productos}`}>
                  <h2>Productos</h2>
                </div>
              </Link>

              <Link to={"/reservas"}>
                <div className={`${h.card} ${h.card__reservas}`}>
                  <h2>Reservas</h2>
                </div>
              </Link>

              <Link to={"/ventas"}>
                <div className={`${h.card} ${h.card__ventas}`}>
                  <h2>Ventas</h2>
                </div>
              </Link>

              <Link to={"/ordenes"}>
                <div className={`${h.card} ${h.card__ordenes}`}>
                  <h2>Ordenes</h2>
                </div>
              </Link>

              <Link to={"/usuarios"}>
                <div className={`${h.card} ${h.card__usuarios}`}>
                  <h2>Usuarios</h2>
                </div>
              </Link>
            </div>
          </div>
        );
      } else {
        return (
          <div>
            <div
              className={
                modalVisivility === "modalMenu"
                  ? s.modalMenu
                  : s.modalMenuVisible
              }
            >
              <a
                id={s.closeModal}
                className="material-symbols-outlined"
                onClick={() => setmodalVisivility("modalMenu")}
              >
                close
              </a>

              <div className={s.modalDiv}>
                <span className={`material-symbols-outlined ${s.modalSpan}`}>
                  manage_accounts
                </span>
                <button
                  className={s.modalButton}
                  onClick={() =>
                    isAuthenticated ? navigate("/profile") : loginWithRedirect()
                  }
                >
                  Perfil
                </button>
              </div>

              <div className={s.modalDiv} onClick={() => navigate("/home")}>
                <span className={`material-symbols-outlined ${s.modalSpan}`}>
                  home
                </span>
                <button className={s.modalButton}>Inicio</button>
              </div>
              <div className={s.modalDiv}>
                <span className={`material-symbols-outlined ${s.modalSpan}`}>
                  {isAuthenticated ? "logout" : "login"}{" "}
                </span>
                <button
                  className={s.modalButton}
                  onClick={() =>
                    isAuthenticated ? logout() : loginWithRedirect()
                  }
                >
                  {isAuthenticated ? "Salir" : "Entrar"}
                </button>
              </div>
            </div>
            <div className={s.navbar__container}>
              <div className={s.navbar__content}>
                <div className={s.lightLogo}>
                  <Link to={"/home"}>
                    <img
                      src="https://res.cloudinary.com/dbvh03usi/image/upload/v1673154193/logoLight.svg"
                      alt="logo_EasyOrder.svg"
                    />
                  </Link>
                </div>
                <div className={s.darkLogo}>
                  <Link to={"/home"}>
                    <img
                      src="https://res.cloudinary.com/dbvh03usi/image/upload/v1673154201/logoDark.svg"
                      alt="logo_EasyOrder.svg"
                    />
                  </Link>
                </div>
                <div className={s.navbar__allicons}>
                  <span
                    onClick={() =>
                      isAuthenticated
                        ? navigate("/profile")
                        : loginWithRedirect()
                    }
                    className="material-symbols-outlined"
                  >
                    account_circle
                  </span>

                  <a
                    id={s.menuButton}
                    className="material-symbols-outlined"
                    onClick={() => setmodalVisivility("modalMenuVisible")}
                  >
                    menu
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
  }
};
