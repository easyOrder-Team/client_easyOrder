import React from "react";
import { Profile, SearchBar } from ".";
import s from "../styles/NavBar.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const NavBar = () => {
  const [modalVisivility, setmodalVisivility] = useState("modalMenu");
  const { logout, isAuthenticated, loginWithRedirect } = useAuth0();
  const profile = JSON.parse(localStorage.getItem("profile"));
  const navigate = useNavigate();
  let location = useLocation().pathname;
  if (
    location !== "/createProduct" &&
    !location.includes("/cards") &&
    location !== "/profile" &&
    location !== "/scannQR" &&
    location !== "/selectPayMethod" &&
    location !== "/usuarios"
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
              onClick={() =>
                isAuthenticated
                  ? logout({ returnTo: import.meta.env.VITE_RUTA })
                  : loginWithRedirect()
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
              <abbr title="Perfil">
                {isAuthenticated ? (
                  <span
                    onClick={() => navigate("/profile")}
                    className={s.profileImage}
                    id="icon"
                  >
                    <img
                      onClick={() => navigate("/profile")}
                      src={profile.picture}
                      alt="profile.jpg"
                    />
                  </span>
                ) : (
                  <span
                    onClick={() => loginWithRedirect()}
                    className="material-symbols-outlined"
                    id="icon"
                  >
                    account_circle
                  </span>
                )}
              </abbr>
              <abbr title="Reservar una mesa">
                <span
                  className="material-symbols-outlined"
                  id="icon"
                  onClick={() =>
                    isAuthenticated
                      ? navigate("/createReservation")
                      : loginWithRedirect()
                  }
                >
                  calendar_today
                </span>
              </abbr>
              <abbr title="Carrito de compras">
                <Link to={"/cart"}>
                  <span className="material-symbols-outlined" id="icon">
                    shopping_cart
                  </span>
                </Link>
              </abbr>
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
                isAuthenticated
                  ? logout({ returnTo: import.meta.env.VITE_RUTA })
                  : loginWithRedirect()
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
              {isAuthenticated ? (
                <span
                  onClick={() => navigate("/profile")}
                  className={s.profileImage}
                >
                  <img
                    onClick={() => navigate("/profile")}
                    src={profile.picture}
                    alt="profile.jpg"
                  />
                </span>
              ) : (
                <span
                  onClick={() => loginWithRedirect()}
                  className="material-symbols-outlined"
                  id="icon"
                >
                  account_circle
                </span>
              )}
              <span
                className="material-symbols-outlined"
                onClick={() =>
                  isAuthenticated
                    ? navigate("/createReservation")
                    : loginWithRedirect()
                }
              >
                calendar_today
              </span>
              <Link to={"/cart"}>
                <span className="material-symbols-outlined">shopping_cart</span>
              </Link>

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
