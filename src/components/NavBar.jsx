import React from "react";
import { SearchBar } from ".";
import s from "../styles/NavBar.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const NavBar = () => {
  const [modalVisivility, setmodalVisivility] = useState("modalMenu");
  const { logout, isAuthenticated, loginWithRedirect } = useAuth0();

  const navigate = useNavigate();
  let location = useLocation().pathname;
  if (location !== "/createProduct" && !location.includes("/cards")) {
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

          <div class={s.modalDiv}>
            <span class={`material-symbols-outlined ${s.modalSpan}`}>
              manage_accounts
            </span>
            <button
              class={s.modalButton}
              onClick={() =>
                isAuthenticated ? navigate("/profile"): loginWithRedirect()
              }
            >
              Perfil
            </button>
          </div>

          <div class={s.modalDiv}>
            <span class={`material-symbols-outlined ${s.modalSpan}`} onClick={() => navigate("/home")}>home</span>
            <button class={s.modalButton}>Inicio</button>
          </div>
          <div class={s.modalDiv}>
            <span class={`material-symbols-outlined ${s.modalSpan}`}>
              {isAuthenticated ? "logout" : "login"}{" "}
            </span>
            <button
              class={s.modalButton}
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
                <h5>Easy</h5>
                <h5>Order</h5>
              </Link>
            </div>
            <div className={s.navbar__allicons}>
              <span className="material-symbols-outlined">notifications</span>
              <span className="material-symbols-outlined">shopping_cart</span>

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
          <SearchBar />
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

          <div class={s.modalDiv}>
            <span class={`material-symbols-outlined ${s.modalSpan}`}>
              manage_accounts
            </span>
            <button
              class={s.modalButton}
              onClick={() =>
                isAuthenticated ? navigate("/profile"): loginWithRedirect()
              }
            >
              Perfil
            </button>
          </div>

          <div class={s.modalDiv} onClick={() => navigate("/home")}>
            <span class={`material-symbols-outlined ${s.modalSpan}`} >home</span>
            <button class={s.modalButton}>Inicio</button>
          </div>
          <div class={s.modalDiv}>
            <span class={`material-symbols-outlined ${s.modalSpan}`}>
              {isAuthenticated ? "logout" : "login"}{" "}
            </span>
            <button
              class={s.modalButton}
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
                <h5>Easy</h5>
                <h5>Order</h5>
              </Link>
            </div>
            <div className={s.navbar__allicons}>
              <span className="material-symbols-outlined">notifications</span>
              <span className="material-symbols-outlined">shopping_cart</span>

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
