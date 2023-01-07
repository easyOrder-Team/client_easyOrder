import React from "react";
import s from "../styles/NavBar.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import h from "../styles/Admin.module.css";

export const Admin = () => {
  const [modalVisivility, setmodalVisivility] = useState("modalMenu");
  const { logout, isAuthenticated, loginWithRedirect } = useAuth0();

  const navigate = useNavigate();
  let location = useLocation().pathname;
  if (
    location !== "/createProduct" &&
    !location.includes("/cards") &&
    location !== "/profile" &&
    location !== "/scannQR" &&
    location !== "/selectPayMethod"
  ) {
    return (
      <div>
        <div
          className={
            modalVisivility === "modalMenu" ? s.modalMenu : s.modalMenuVisible
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

          <div className={s.modalDiv}>
            <span
              className={`material-symbols-outlined ${s.modalSpan}`}
              onClick={() => navigate("/home")}
            >
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
              onClick={() => (isAuthenticated ? logout() : loginWithRedirect())}
            >
              {isAuthenticated ? "Salir" : "Entrar"}
            </button>
          </div>
        </div>
        <div className={s.navbar__container}>
          <div className={s.navbar__content}>
            <div className={s.logo}>
              <Link to={"/home"}>
                <img
                  src="https://res.cloudinary.com/dypjcpbis/image/upload/v1670886694/EasyOrder_BD/Recurso_1_l9yefi.svg"
                  alt="logo_EasyOrder.svg"
                />
              </Link>
            </div>
            <div className={s.navbar__allicons}>
              <span className="material-symbols-outlined">notifications</span>
              <Link to={"/cart"}>
                <span className="material-symbols-outlined">shopping_cart</span>
              </Link>
              <span
                onClick={() =>
                  isAuthenticated ? navigate("/profile") : loginWithRedirect()
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
        <div>
          <span className="material-symbols-outlined">account_circle</span>
          <h2>Username</h2>
          <h4>Admin</h4>
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
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div
          className={
            modalVisivility === "modalMenu" ? s.modalMenu : s.modalMenuVisible
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
              onClick={() => (isAuthenticated ? logout() : loginWithRedirect())}
            >
              {isAuthenticated ? "Salir" : "Entrar"}
            </button>
          </div>
        </div>
        <div className={s.navbar__container}>
          <div className={s.navbar__content}>
            <div className={s.logo}>
              <Link to={"/home"}>
                <img
                  src="https://res.cloudinary.com/dypjcpbis/image/upload/v1670886694/EasyOrder_BD/Recurso_1_l9yefi.svg"
                  alt="logo_EasyOrder.svg"
                />
              </Link>
            </div>
            <div className={s.navbar__allicons}>
              <span className="material-symbols-outlined">notifications</span>
              <Link to={"/cart"}>
                <span className="material-symbols-outlined">shopping_cart</span>
              </Link>
              <span
                onClick={() =>
                  isAuthenticated ? navigate("/profile") : loginWithRedirect()
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
};
